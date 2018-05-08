import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

export class Beneficiario {
  constructor(
    public nome: string,
    public sobreNome: string,
    public idade: number,
    public hash: string,
    public telefone: string,
    public saldo: number
  ) {}
}

export class Contrato {
  constructor(
    public codigo: number,
    public hashDocumento: string,
    public nome: string,
    public saldo: number
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(private web3Service: Web3Service) { }
}
