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
    private contratos: ContratosService
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
    this.beneficiario = new Beneficiario(
      'ALICE',
      'de Souza',
      25,
      '0x1Dc8f94107B0Dc7Be5738886d803b42Ef843f1eC',
      '+55(27) 99912-3456',
      100);
  }

  cadastrar(): void {
    this.contratos.adicionarContrato(1, "Plano Single Flex", environment.carteiraOperadora)
    .subscribe(s => console.log(s));
    console.log(environment.carteiraOperadora);

    this.contratos.adicionarBeneficiario(1, environment.carteiraAlice, "ALICE DE SOUZA", "008012234", environment.carteiraOperadora);
    console.log('adicionandoBeneficiario...');
  }
}
