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
    //CONTRATOS
    await this.contratoService.adicionarContrato(1, 'Plano Single Flex', environment.carteiraOperadora);
    // await this.contratoService.adicionarBeneficiario(1, environment.carteiraAlice,
    //    'ALICE DE SOUZA', '008012234', environment.carteiraOperadora);
    // await this.contratoService.verificarBeneficiario(1, environment.carteiraAlice, environment.carteiraAlice);
    // await this.contratoService.receberPagamento(1, environment.carteiraAlice, 12000000000000000000);
    // this.contratoService.pagarAutorizacao(await this.autorizadorService.getEndereco(), 1, 500000);
    // this.contratoService.consultarSaldo(1)
    //   .then(s => { console.log(s) });
     
    //SERVICOS
    await this.servicosService.registrarServico("EX003", "Exame de Sangue", 2000, 1);
    // await this.servicosService.consultarServico("EX001");

    //PRESTADORES
    await this.prestadoresSerivce.adicionarPrestador(environment.carteiraPrestador);
    // this.prestadoresSerivce.verificarPrestador(environment.carteiraPrestador, 1)
    //   .then(o => { console.log(o); });

    //AUTORIZADOR
    // await this.autorizadorService.registrarAutorizacao(
    //     await this.contratoService.getEndereco(), 
    //     environment.carteiraAlice, 
    //     await this.servicosService.getEndereco(), 
    //     1, "EX003", 1);
    this.router.navigate(['/adesao']);
  }
}
