import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Web3Service } from './web3.service';

declare var require: any;
const contratosArtifacts = require('../../solidity/build/contracts/Contratos.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  Contratos = contract(contratosArtifacts);

  constructor(web3Service: Web3Service) {
    this.Contratos.setProvider(web3Service.web3.currentProvider);
  }

  getBalance(account: any): Observable<number> {
    let meta;

    return Observable.create(observer => {
      this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.getBalance.call(account, {
            from: account
          });
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  sendCoin(from: any, to: any, amount: number): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.Contratos
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.sendCoin(to, amount, {
            from: from
          });
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
