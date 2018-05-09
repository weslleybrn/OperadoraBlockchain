import { Component, OnInit } from '@angular/core';
import { Prestador, PrestadorService } from '../../services/prestador.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.css']
})
export class ProcedimentoComponent implements OnInit {
  form: FormGroup;
  prestador: Prestador;

  constructor(
    private formBuilder: FormBuilder,
    private prestadorService: PrestadorService
  ) { }

  ngOnInit() {
    this.load();
    this.config();
  }

  config(): any {
    this.form = this.formBuilder.group({
      nome: [this.prestador.nome, Validators.nullValidator],
      sobreNome: [this.prestador.sobreNome, Validators.nullValidator],
      crm: [this.prestador.crm, Validators.nullValidator]
    });
  }

  load(): any {
    this.prestadorService
      .getPrestador()
      .subscribe(prestador => {
        this.prestador = prestador;
      });
  }
}
