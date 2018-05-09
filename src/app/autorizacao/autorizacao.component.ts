import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato, Beneficiario, ContratosService } from '../../services/contratos.service';
import { ServicosService, Servico } from '../../services/servicos.service';

@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.component.html',
  styleUrls: ['./autorizacao.component.css']
})
export class AutorizacaoComponent implements OnInit {
  panelOpenState = false;
  form: FormGroup;
  contrato: Contrato;
  beneficiario: Beneficiario;
  servicos: Servico[];

  constructor(
    private formBuilder: FormBuilder,
    private contratoService: ContratosService,
    private servicosService: ServicosService
  ) { }

  ngOnInit() {
    this.load();

    this.form = this.formBuilder.group({
      nome: [this.contrato.nome, Validators.nullValidator],
      codigo: [this.contrato.codigo, Validators.nullValidator],
      saldo: [this.contrato.saldo, Validators.nullValidator],
      mensalidade: [this.contrato.mensalidade, Validators.nullValidator]
    });
  }

  load(): any {
    this.contratoService
      .getBeneficiario()
      .subscribe(beneficiario => {
        this.beneficiario = beneficiario;
      });

    this.contratoService
      .getContrato()
      .subscribe(contrato => {
        this.contrato = contrato;
      });

    this.servicosService
      .getServicos()
      .subscribe(servicos => {
        this.servicos = servicos;
      });
  }
}
