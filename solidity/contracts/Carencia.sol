pragma solidity ^0.4.21;

contract Carencia {
    
    constructor() public {}

    mapping(uint8 => bool) carencia;
    
    function registrarCarencias(uint8[] _agrupadores) public {
        for (uint x = 0; x < _agrupadores.length; x++) {
            carencia[_agrupadores[x]] = true;
        }
    }
    
    function alterarCarencia(uint8 _agrupador, bool _emCarencia) public {
        carencia[_agrupador] = _emCarencia;
    }
    
    function possuiCarencia(uint8 _agrupador) public view returns (bool) {
        return carencia[_agrupador];
    }
}