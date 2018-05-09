pragma solidity ^0.4.21;

import "./Contratos.sol";
import "./Cobertura.sol";
import "./Servicos.sol";
import "./Prestadores.sol";

contract Autorizador {
    
    struct Autorizacao {
        address beneficiario;
        string codigoTuss;
        uint quantidade;
        uint valor;
        address prestador;
        bool confirmada;
    }
    
    Autorizacao[] autorizacoes;
    
    function() payable public {
    }
    
    function registrarAutorizacao(address _enderecoContratos, address _beneficiario, address _servicos, uint _codigoDoContrato, string _codigoTUSS, uint _quantidade) public {
        
        Contratos contratos = Contratos(_enderecoContratos);
        
        //Verificar se o beneficiario pertence ao contrato informado
        require(contratos.verificarBeneficiario(_codigoDoContrato, _beneficiario));

        //Encontrar serviço pelo codigo (Codigo, Nome, Valor, Agrupamento) - Clase Servicos
        Servicos servicos = Servicos(_servicos);
        uint preco;
        uint8 agrupador;
        (preco, agrupador) = servicos.consultarServico(_codigoTUSS);
        
        //require(address(contratos).balance >= (preco * _quantidade));

        //Validar se possui cobertura para o serviço
        Cobertura cobertura = Cobertura(contratos.recuperarCobertura(_codigoDoContrato));
        bool possuiCobertura = cobertura.possuiCobertura(agrupador);
        
        require(possuiCobertura);
        
        //Validar se o beneficiario está em carência para o agrupamento
        //Carencia carencia = Carencia(contratos.recuperarCarencia(_codigoDoContrato, _beneficiario));
        //bool emCarencia = carencia.possuiCarencia(agrupador);
        
        //require(emCarencia);
        
        //Gerar autorizacao
        Autorizacao memory autorizacao = Autorizacao({beneficiario: _beneficiario, codigoTuss: _codigoTUSS, quantidade: _quantidade, valor: (preco * _quantidade), prestador: address(0x0), confirmada: false });
        autorizacoes.push(autorizacao);
        
        contratos.pagarAutorizacao(address(this), _codigoDoContrato, autorizacao.valor);
        
        //emit(autorizacoes.length)
    }
    
    function realizarExecucao(address _contratoPrestadores, address _servicos, uint _numeroDaAutorizacao) public {
        require(_numeroDaAutorizacao <= autorizacoes.length);
        
        Autorizacao memory autorizacao = autorizacoes[_numeroDaAutorizacao - 1];
        require(autorizacao.confirmada == false);
        
        Servicos servicos = Servicos(_servicos);
        uint8 agrupador = servicos.consultarAgrupador(autorizacao.codigoTuss);
        
        Prestadores prestadores = Prestadores(_contratoPrestadores);
        bool prestadorOk = prestadores.verificarPrestador(msg.sender, agrupador);
        
        require(prestadorOk);

        autorizacao.prestador = msg.sender;
        
        autorizacoes[_numeroDaAutorizacao - 1] = autorizacao;
    }
    
    function confirmarExecucao(uint _numeroDaAutorizacao, address _prestador) public {
        require(_numeroDaAutorizacao <= autorizacoes.length);
        
        Autorizacao memory autorizacao = autorizacoes[_numeroDaAutorizacao - 1];
        require((msg.sender == autorizacao.beneficiario) && (_prestador == autorizacao.prestador) && (autorizacao.confirmada == false) && (address(this).balance >= autorizacao.valor));
        
        autorizacao.confirmada = true;
        autorizacao.prestador.transfer(autorizacao.valor);
        
        autorizacoes[_numeroDaAutorizacao - 1] = autorizacao;
    }
}