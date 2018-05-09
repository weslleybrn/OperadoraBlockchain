import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibo-contrato',
  templateUrl: './recibo-contrato.component.html',
  styleUrls: ['./recibo-contrato.component.css']
})
export class ReciboContratoComponent implements OnInit {
  data: Date;

  constructor() { }

  ngOnInit() {
    this.data = new Date();
  }

}
