import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato, ContratosService, Beneficiario } from '../../services/contratos.service';

@Component({
  selector: 'app-adesao',
  templateUrl: './adesao.component.html',
  styleUrls: ['./adesao.component.css']
})
export class AdesaoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato;
  beneficiario: Beneficiario;

  constructor(
    private formBuilder: FormBuilder,
    private contratoService: ContratosService
  ) { }

  ngOnInit() {
    this.load();

    this.form = this.formBuilder.group({
      nome: [this.contrato.nome, Validators.nullValidator],
      codigo: [this.contrato.codigo, Validators.nullValidator],
      saldo: [this.contrato.saldo, Validators.nullValidator]
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
  }

}
