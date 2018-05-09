import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibo-procedimento',
  templateUrl: './recibo-procedimento.component.html',
  styleUrls: ['./recibo-procedimento.component.css']
})
export class ReciboProcedimentoComponent implements OnInit {
  data: Date;

  constructor() { }

  ngOnInit() {
    this.data = new Date();
  }

  reset(): any {
    window.location.href = '/';
  }

}
