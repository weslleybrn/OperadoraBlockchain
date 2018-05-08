import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';
import { environment } from '../environments/environment';

declare var require: any;
const servicosArtifacts = require('../../solidity/build/contracts/Servicos.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})

export class ServicosService {

  Servicos = contract(servicosArtifacts);

  constructor(private web3Service: Web3Service) { 
    this.Servicos.setProvider(web3Service.web3.currentProvider);
  }

  registrarServico(codigoTUSS: string, nome: string, valor: number, agrupador: number) {
    let meta;

    this.Servicos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.registrarServico.call(codigoTUSS, nome, valor, agrupador, {from: environment.carteiraOperadora});
        })
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
  }

  consultarServico(codigoTUSS: string): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Servicos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.consultarServico.call(codigoTUSS, {from: environment.carteiraOperadora});
        })
        .then(() => {
          observer.next();
          observer.next();
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
}
