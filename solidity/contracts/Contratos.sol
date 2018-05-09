pragma solidity ^0.4.21;

import "./Cobertura.sol";
import "./Carencia.sol";

contract Contratos {

    address owner;

    struct Beneficiario {
        string nome;
        string carteira;
        Carencia carencia;
        byte flag;
    }
    
    struct Contrato {
        string hashDoDocumento;
        string nomeDoContrato;
        Cobertura cobertura;
        uint saldo;
        mapping(address => Beneficiario) beneficiarios;
    }
    
    mapping(uint => Contrato) contratos;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function adicionarContrato(uint _codigoContrato, string _nomeContrato, string _hash) onlyOwner public {

        uint8[] memory agrupadores = new uint8[](5);
        agrupadores[0] = 1;
        agrupadores[1] = 2;
        agrupadores[2] = 3;
        agrupadores[3] = 4;
        agrupadores[4] = 5;
        
        Cobertura cobertura = new Cobertura();
        cobertura.registrarCoberturas(agrupadores);
        
        contratos[_codigoContrato] = Contrato({nomeDoContrato: _nomeContrato, hashDoDocumento: _hash, cobertura: cobertura, saldo: 0});
        
        // emit ContratoCriado(_codigoContrato)
    }
    
    function receberPagamento(uint _codigoContrato) payable public {
        require(msg.value > 0);
        contratos[_codigoContrato].saldo += msg.value;
    }
    
    function pagarAutorizacao(address _autorizador, uint _codigoContrato, uint _valor) public {
        //uint valor = (_valor * 10**18);
        require(address(this).balance >= _valor);
        
        uint saldo = contratos[_codigoContrato].saldo - _valor;
        contratos[_codigoContrato].saldo = saldo;
        
        _autorizador.transfer(_valor);
    }
    
    function adicionarBeneficiario(uint _codigoContrato, address _wallet, string _nome, string _carteira) public {
        
        require(contratos[_codigoContrato].beneficiarios[_wallet].flag == byte(0));
        
        uint8[] memory agrupadores = new uint8[](5);
        agrupadores[0] = 1;
        agrupadores[1] = 2;
        agrupadores[2] = 3;
        agrupadores[3] = 4;
        agrupadores[4] = 5;
        
        Carencia carencia = new Carencia();
        carencia.registrarCarencias(agrupadores);
        
        contratos[_codigoContrato].beneficiarios[_wallet] = Beneficiario({nome: _nome, carteira: _carteira, carencia: carencia, flag: byte(1)});
    }
    
    function consultarSaldo(uint _codigoContrato) public view returns (uint saldo) {
        saldo = contratos[_codigoContrato].saldo;
    }
    
    function consultarSaldoTotal() public view returns (uint saldo) {
        saldo = address(this).balance;
    }
    
    function verificarBeneficiario(uint _codigoContrato, address _beneficiario) public view returns (bool ok) {
        require(contratos[_codigoContrato].beneficiarios[_beneficiario].flag == byte(1));
        ok = true;
    }
    
    function alterarCarencia(uint _codigoContrato, address _beneficiario, uint8 _agrupador, bool _carencia) onlyOwner public {
        require(contratos[_codigoContrato].beneficiarios[_beneficiario].flag == byte(1));
        contratos[_codigoContrato].beneficiarios[_beneficiario].carencia.alterarCarencia(_agrupador, _carencia);
    }
    
    function removerBeneficiario(uint _codigoContrato, address _beneficiario) onlyOwner public {
        delete contratos[_codigoContrato].beneficiarios[_beneficiario];
    }
    
    function adicionarCobertura(uint _codigoContrato, uint8 _agrupador) onlyOwner public {
        contratos[_codigoContrato].cobertura.alterarCobertura(_agrupador, true);
    }
    
    function removerCobertura(uint _codigoContrato, uint8 _agrupador) onlyOwner public {
        contratos[_codigoContrato].cobertura.alterarCobertura(_agrupador, false);
    }
    
    function recuperarCobertura(uint _codigoContrato) public view returns (address) {
        return address(contratos[_codigoContrato].cobertura);
    }
    
    function cancelarContrato() onlyOwner public {
        selfdestruct(owner);
    }
}