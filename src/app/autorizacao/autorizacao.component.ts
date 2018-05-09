import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato, ContratosService, Beneficiario } from '../../services/contratos.service';
import { AutorizadorService } from '../../services/autorizador.service';
import { PrestadorService } from '../../services/prestador.service';
import { ServicosService, Servico } from '../../services/servicos.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
    private servicosService: ServicosService,
    private autorizadorService: AutorizadorService,
    private prestadorService: PrestadorService,
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

    this.servicosService
      .getServicos()
      .subscribe(servicos => {
        this.servicos = servicos;
      });
  }

  async solicitar() {

    await this.autorizadorService.registrarAutorizacao(
            await this.contratoService.getEndereco(),
            environment.carteiraAlice,
            await this.servicosService.getEndereco(),
            1, 'EX003', 1);

    this.router.navigate(['/recibocontrato']);
  }
}
