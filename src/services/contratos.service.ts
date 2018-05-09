import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';
import { of } from 'rxjs/internal/observable/of';

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
    public mensalidade: number,
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
  10,
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
    this.$contrato = of(CONTRATO);
    this.Contratos.setProvider(web3Service.web3.currentProvider);
  }

  async adicionarContrato(codigoContrato: number, nomeContrato: string, account: any) {
    try {
      const deployed = await this.Contratos.deployed();
      const transaction = await deployed
      .adicionarContrato
      .sendTransaction(codigoContrato, nomeContrato, '',
      {
        from: account,
        gas: 1000000
      });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }
  }

  async adicionarBeneficiario(codigoContrato: number, enderecoCliente: any, nome: string, carteirinha: string, account: any) {
    try {
      const deployed = await this.Contratos.deployed();
      const transaction = await deployed
      .adicionarBeneficiario
      .sendTransaction(codigoContrato, enderecoCliente, nome, carteirinha,
        {
          from: account,
          gas: 1000000
        });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }
  }

  async verificarBeneficiario(codigoContrato: number, enderecoCliente: any, account: any) {
    try {
      const deployed = await this.Contratos.deployed();
      return deployed
      .verificarBeneficiario
      .call(codigoContrato, enderecoCliente,
      {
        from: account,
        gas: 1000000
      })
      .then(s => {
        console.log(s);
        return s;
      });
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }
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

  getBeneficiario(): Observable<Beneficiario> {
    return this.$beneficiario;
  }

  getContrato(): Observable<Contrato> {
    return this.$contrato;
  }
}
