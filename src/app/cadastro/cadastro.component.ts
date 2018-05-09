import { Component, OnInit } from '@angular/core';
import { Beneficiario, ContratosService } from '../../services/contratos.service';
import { ServicosService } from '../../services/servicos.service';
import { PrestadorService } from '../../services/prestador.service';
// import { AutorizadorService } from '../../services/autorizador.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  beneficiario: Beneficiario;

  constructor(
    private formBuilder: FormBuilder,
    private contratoService: ContratosService,
    private servicosService: ServicosService,
    private prestadoresSerivce: PrestadorService,
    // private autorizadorService: AutorizadorService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.load();
    this.config();
  }

  config(): any {
    this.form = this.formBuilder.group({
      nome: [this.beneficiario.nome, Validators.nullValidator],
      sobreNome: [this.beneficiario.sobreNome, Validators.nullValidator],
      saldo: [this.beneficiario.saldo, Validators.nullValidator],
      telefone: [this.beneficiario.telefone, Validators.nullValidator],
      hash: [this.beneficiario.hash, Validators.nullValidator],
      idade: [this.beneficiario.idade, Validators.nullValidator]
    });
  }

  load(): any {
    this.contratoService
      .getBeneficiario()
      .subscribe(beneficiario => {
        this.beneficiario = beneficiario;
      });
  }

  async cadastrar() {
    await this.contratoService.adicionarContrato(1, 'Plano Single Flex', environment.carteiraOperadora);
    await this.servicosService.registrarServico('EX003', 'Ultrasonografia Ocular', 2000000000000000000, 1);
    await this.prestadoresSerivce.adicionarPrestador(environment.carteiraPrestador);
    this.router.navigate(['/adesao']);
  }
}
