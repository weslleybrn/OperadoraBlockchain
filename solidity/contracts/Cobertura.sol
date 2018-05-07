pragma solidity ^0.4.21;

contract Cobertura {
    
    mapping(uint8 => bool) cobertura;
    
    function registrarCoberturas(uint8[] _agrupadores) public {
        for (uint x = 0; x < _agrupadores.length; x++) {
            cobertura[_agrupadores[x]] = true;
        }
    }
    
    function alterarCobertura(uint8 _agrupador, bool _possuiCobertura) public {
        cobertura[_agrupador] = _possuiCobertura;
    }
    
    function possuiCobertura(uint8 _agrupador) public view returns (bool) {
        return cobertura[_agrupador];
    }
}