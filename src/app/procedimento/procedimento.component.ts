import { Component, OnInit } from '@angular/core';
import { Prestador, PrestadorService } from '../../services/prestador.service';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.css']
})
export class ProcedimentoComponent implements OnInit {

  prestador: Prestador;

  constructor(
    private prestadorService: PrestadorService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): any {
    this.prestadorService
      .getPrestador()
      .subscribe(prestador => {
        this.prestador = prestador;
      });
  }
}
