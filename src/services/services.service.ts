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
}
