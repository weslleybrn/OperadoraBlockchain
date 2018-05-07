pragma solidity ^0.4.21;

import "./Cobertura.sol";

contract Prestadores {
    
    struct Prestador {
        Cobertura cobertura;
        byte flag;
    }
    
    mapping(address => Prestador) prestadores;
    
    function adicionarPrestador(address _prestador) public {
        
        uint8[] memory agrupadores = new uint8[](5);
        agrupadores[0] = 1;
        agrupadores[1] = 2;
        //agrupadores[2] = 3;
        //agrupadores[3] = 4;
        //agrupadores[4] = 5;
        
        Cobertura cobertura = new Cobertura();
        cobertura.registrarCoberturas(agrupadores);
        
        Prestador memory prestador = Prestador({cobertura: cobertura, flag: byte(1)});
        prestadores[_prestador] = prestador;
    }
    
    function verificarPrestador(address _prestador, uint8 _agrupador) public view returns (bool ok) {
        Prestador memory prestador = prestadores[_prestador];
        bool temCobertura = prestador.cobertura.possuiCobertura(_agrupador);
        ok = temCobertura && prestadores[_prestador].flag == byte(1);
    }
}