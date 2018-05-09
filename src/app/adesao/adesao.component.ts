import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato, ContratosService, Beneficiario } from '../../services/contratos.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
    private contratoService: ContratosService,
    private router: Router
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
  }

  async aderir() {
    await this.contratoService.adicionarBeneficiario(1, environment.carteiraAlice,
      'ALICE DE SOUZA', '008012234', environment.carteiraOperadora);

    await this.contratoService.receberPagamento(1, environment.carteiraAlice, 12000000000000000000);

    this.router.navigate(['/autorizacao']);
  }
}
