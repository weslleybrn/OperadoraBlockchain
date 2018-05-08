import { Component, OnInit } from '@angular/core';
import { Beneficiario, ContratosService } from '../../services/contratos.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

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
    private contratoService: ContratosService
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

    await this.contratoService.adicionarBeneficiario(1, environment.carteiraAlice,
      'ALICE DE SOUZA', '008012234', environment.carteiraOperadora);

    await this.contratoService.verificarBeneficiario(1, environment.carteiraAlice);
  }
}
