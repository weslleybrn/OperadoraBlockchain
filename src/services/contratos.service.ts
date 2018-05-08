import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
<<<<<<< HEAD
import { environment } from '../environments/environment';
=======
import { of } from 'rxjs/internal/observable/of';
>>>>>>> 352471fd7bcb7f6faa797044d0c3a263f7020de9

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

const BENEFICIARIO: Beneficiario = new Beneficiario(
  'ALICE',
  'de Souza',
  25,
  '0x1Dc8f94107B0Dc7Be5738886d803b42Ef843f1eC',
  '+55(27) 99912-3456',
  100);

const CONTRATO: Contrato = new Contrato(1,
  '0x8177ba3670860af48af3582093d715e2c5e1deff',
  '0x20da5a327543802766740d22691d58d0b21a4ece0081afc456f02053d65a609e',
  100);

declare var require: any;
const contratosArtifacts = require('../../solidity/build/contracts/Contratos.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})

export class ContratosService {

  private $beneficiario: Observable<Beneficiario>;
  private $contrato: Observable<Contrato>;

  Contratos = contract(contratosArtifacts);

  constructor(private web3Service: Web3Service) {
    this.$beneficiario = of(BENEFICIARIO);

    this.Contratos.setProvider(web3Service.web3.currentProvider);
  }

  adicionarContrato(codigoContrato: number, nomeContrato: string, account: any): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
<<<<<<< HEAD
          return meta.adicionarContrato.call(codigoContrato, nomeContrato, "", {from: account});
=======
          return meta.adicionarContrato(codigoContrato, nomeContrato, '');
>>>>>>> 352471fd7bcb7f6faa797044d0c3a263f7020de9
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

<<<<<<< HEAD
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
=======
  getBeneficiario(): Observable<Beneficiario> {
    return this.$beneficiario;
  }

  getContrato(): Observable<Contrato> {
    return this.$contrato;
>>>>>>> 352471fd7bcb7f6faa797044d0c3a263f7020de9
  }
}
