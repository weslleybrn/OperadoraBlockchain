import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';

declare var require: any;
const prestadoresArtifacts = require('../../solidity/build/contracts/Prestadores.json');
const contract = require('truffle-contract');

export class Prestador {
  constructor(
    public nome: string,
    public sobreNome: string,
    public crm: string
  ) { }
}

const PRESTADOR: Prestador = new Prestador(
  'Marcos',
  'da Silva',
  'CRM 131.313'
);

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  $prestador: Observable<Prestador>;

  Prestadores = contract(prestadoresArtifacts);

  constructor(private web3Service: Web3Service) {
    this.Prestadores.setProvider(web3Service.web3.currentProvider);
    this.$prestador = of(PRESTADOR);
  }

  async adicionarPrestador(enderecoPrestador: any) {
    try {
      const deployed = await this.Prestadores.deployed();
      const transaction = await deployed
      .adicionarPrestador
      .sendTransaction(enderecoPrestador,
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
      console.log('Error adicionando prestador; see log.');
    }
  }

  async verificarPrestador(enderecoPrestador: any, agrupador: number): Promise<any> {
    try {
      const deployed = await this.Prestadores.deployed();

      return deployed
        .verificarPrestador
        .call(enderecoPrestador, agrupador,
        {
          gas: 1000000
        });
      // .then(s => {
      //   console.log(s);
      //   return s;
      // });

      // if (!transaction) {
      //   console.log('Transaction failed!');
      // } else {
      //   console.log('Transaction complete!');
      // }
    } catch (e) {
      console.log(e);
      console.log('Error adicionando prestador; see log.');
    }
  }

  getPrestador(): Observable<Prestador> {
    return this.$prestador;
  }
}
