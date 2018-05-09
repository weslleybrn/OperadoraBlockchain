import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibo-contrato',
  templateUrl: './recibo-contrato.component.html',
  styleUrls: ['./recibo-contrato.component.css']
})
export class ReciboContratoComponent implements OnInit {
  data: Date;

  constructor(private router: Router) { }

  ngOnInit() {
    this.data = new Date();
  }

  concluir() {
    this.router.navigate(['/procedimento']);
  }
}
