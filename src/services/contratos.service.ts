import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';

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

  adicionarContrato(codigoContrato: number, nomeContrato: string, account: any): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.adicionarContrato.call(codigoContrato, nomeContrato, "", {from: account});
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

  adicionarBeneficiario(codigoContrato: number, enderecoCliente: any, nome: string, carteirinha: string, account: any) {
    let meta;

    this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.adicionarBeneficiario.call(codigoContrato, enderecoCliente, nome, carteirinha, {from: account});
        })
        .catch(e => {
          console.log(e);
        });
  }

  receberPagamento(codigoContrato: number, account: any, valor: number) {
    let meta;

    this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.receberPagamento.call(codigoContrato, {from: account, value: valor});
        })
        .catch(e => {
          console.log(e);
        });
  }
}
