import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';

import {
  Observer,
  of,
  BehaviorSubject
} from 'rxjs';

export class Servico {
  constructor(public codigo: string,
    public nome: string,
    public valor: number) {}
}

const SERVICOS: Servico[] = [
  new Servico('EX001', 'Tonometria', 50),
  new Servico('EX002', 'Exame de Refração', 100),
  new Servico('EX003', 'Ultrasonografia Ocular', 150)
];

declare var require: any;
const servicosArtifacts = require('../../solidity/build/contracts/Servicos.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})

export class ServicosService {
  $servicos: Observable<Servico[]>;
  Servicos = contract(servicosArtifacts);

  constructor(private web3Service: Web3Service) {
    this.$servicos = of(SERVICOS);
    this.Servicos.setProvider(web3Service.web3.currentProvider);
  }

  getServicos(): Observable<Servico[]> {
    return this.$servicos;
  }

  async registrarServico(codigoTUSS: string, nome: string, valor: number, agrupador: number) {
    try {
      const deployed = await this.Servicos.deployed();
      const transaction = await deployed
      .registrarServico
      .sendTransaction(codigoTUSS, nome, valor, agrupador,
        {
          from: environment.carteiraOperadora,
          gas: 1000000
        });

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error adicionando serviço; see log.');
    }
  }

  async consultarServico(codigoTUSS: string) {
    try {
      const deployed = await this.Servicos.deployed();
      return deployed
        .consultarServico
        .call(codigoTUSS,
        {
          // from: account,
          gas: 1000000
        })
        .then(s => {
          console.log(s);
          return s;
        });
    } catch (e) {
      console.log(e);
      console.log('Error consultado serviço; see log.');
    }
  }

  async getEndereco(): Promise<string> {
    const deployed = await this.Servicos.deployed();
    return deployed.address;
  }
}
