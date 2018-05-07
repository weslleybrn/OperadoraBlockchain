pragma solidity ^0.4.21;

contract Servicos {
    
    struct Servico {
        string nome;
        uint valor;
        uint8 agrupador;
    }
    
    mapping(string => Servico) servicos;
    
    function registrarServico(string _codigoTUSS, string _nome, uint _valor, uint8 _agrupador) public {
        Servico memory s = Servico({nome: _nome, valor: _valor, agrupador: _agrupador});
        servicos[_codigoTUSS] = s;
    }
    
    function consultarServico(string _codigoTUSS) public view returns (uint valor, uint8 agrupador) {
        return (servicos[_codigoTUSS].valor, servicos[_codigoTUSS].agrupador);
    }
    
    function consultarValor(string _codigoTUSS) public view returns (uint valor) {
        valor = servicos[_codigoTUSS].valor;
    }
    
    function consultarAgrupador(string _codigoTUSS) public view returns (uint8 agrupador) {
        agrupador = servicos[_codigoTUSS].agrupador;
    }
}