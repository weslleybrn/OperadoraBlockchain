import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';

export class Beneficiario {
  constructor(
    public nome: string,
    public sobreNome: string,
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

declare var require: any;
const contratosArtifacts = require('../../solidity/build/contracts/Contratos.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  Contratos = contract(contratosArtifacts);

  constructor(private web3Service: Web3Service) { 
    this.Contratos.setProvider(web3Service.web3.currentProvider);
  }

  adicionarContrato(codigoContrato: number, nomeContrato: string, account: any): Observable<number> {
    let meta;

    return Observable.create(observer => {
      this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.adicionarContrato(codigoContrato, nomeContrato, "");
        })
        .then(() => {
          observer.next();
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }
}
