import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';

declare var require: any;
const prestadoresArtifacts = require('../../solidity/build/contracts/Autorizador.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})

export class AutorizadorService {

  Autorizador = contract(prestadoresArtifacts);

  constructor(private web3Service: Web3Service) {
    this.Autorizador.setProvider(web3Service.web3.currentProvider);
  }

  async registrarAutorizacao(enderecoContratos: any, enderecoBeneficiario: any, enderecoServicos: any,
    codigoContrato: number, codigoServico: string, quantidade: number) {
    try {
      const deployed = await this.Autorizador.deployed();
      const transaction = await deployed
      .registrarAutorizacao
      .sendTransaction(
        enderecoContratos,
        enderecoBeneficiario,
        enderecoServicos,
        codigoContrato,
        codigoServico,
        quantidade,
      {
        from: environment.carteiraOperadora,
        gas: 3000000
      });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error registrando autorização; see log.');
    }
  }

  async realizarExecucao(enderecoPrestadores: any, enderecoServicos: any, carteiraPrestador: any, numeroAutorizacao: number) {
    try {
      const deployed = await this.Autorizador.deployed();
      const transaction = await deployed
      .realizarExecucao
      .sendTransaction(
        enderecoPrestadores,
        enderecoServicos,
        carteiraPrestador,
        numeroAutorizacao,
      {
        from: environment.carteiraOperadora,
        gas: 3000000
      });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error realizando execução; see log.');
    }
  }

  async confirmarExecucao(numeroAutorizacao: number, carteriaPrestador: any) {
    try {
      const deployed = await this.Autorizador.deployed();
      const transaction = await deployed
      .confirmarExecucao
      .sendTransaction(
        numeroAutorizacao,
        carteriaPrestador,
      {
        from: environment.carteiraOperadora,
        gas: 3000000
      });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error confirmando execução; see log.');
    }
  }

  async consultarSaldo(): Promise<any> {
    try {
      const deployed = await this.Autorizador.deployed();
      return deployed
      .consultarSaldo
      .call(
      {
        gas: 1000000
      });
    } catch (e) {
      console.log(e);
      console.log('Error consultado saldo; see log.');
    }
  }

  async getEndereco(): Promise<string> {
    const deployed = await this.Autorizador.deployed();
    return deployed.address;
  }
}
