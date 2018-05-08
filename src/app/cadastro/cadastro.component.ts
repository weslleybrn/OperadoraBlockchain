import { Component, OnInit } from '@angular/core';
import { Beneficiario } from '../../services/contratos.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  beneficiario: Beneficiario;

  constructor(
    private formBuilder: FormBuilder
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
}
