import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../../services/web3.service';
import { OperadoraService } from '../../services/services.service';
import { Servico, ServicosService } from '../../services/servicos.service';
import { Beneficiario, Contrato, ContratosService } from '../../services/contratos.service';

export class Wizzard {
  contrato: Contrato;
  servico: Servico;
  beneficiario: Beneficiario;
}

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.css']
})
export class WizzardComponent implements OnInit {
  formGroupBeneficiario: FormGroup;
  formGroupContraro: FormGroup;

  public model: Wizzard;
  public servicos: Servico[];

  constructor(
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private operadoraService: OperadoraService,
    public servicosService: ServicosService,
    public contratosService: ContratosService
  ) { }

  ngOnInit() {
    this.carregarModel();
    this.carregarServicos();
    this.carregarContratos();

    this.formGroupBeneficiario = this.formBuilder.group({
      nome: [this.model.beneficiario.nome, Validators.nullValidator],
      sobreNome: [this.model.beneficiario.sobreNome, Validators.nullValidator],
      saldo: [this.model.beneficiario.saldo, Validators.nullValidator],
      telefone: [this.model.beneficiario.telefone, Validators.nullValidator],
      hash: [this.model.beneficiario.hash, Validators.nullValidator]
    });

    this.formGroupContraro = this.formBuilder.group({
      nome: [this.model.contrato.nome, Validators.nullValidator],
      codigo: [this.model.contrato.codigo, Validators.nullValidator],
      saldo: [this.model.contrato.saldo, Validators.nullValidator],
      servicoCodigo: [this.model.servico.codigo, Validators.nullValidator]
    });
  }

  carregarModel(): any {
    this.model = new Wizzard();
    this.model.beneficiario = new Beneficiario(
      'ALICE',
      'de Souza',
      25,
      '0x1Dc8f94107B0Dc7Be5738886d803b42Ef843f1eC',
      '+55(27) 99912-3456',
      100);
  }

  carregarServicos(): any {
    this.servicosService
      .getServicos()
      .subscribe(servicos => {
        this.model.servico = servicos[0];
        this.servicos = servicos;
      });
  }

  carregarContratos(): any {
      this.model.contrato = new Contrato(1,
      '0x8177ba3670860af48af3582093d715e2c5e1deff',
      '0x20da5a327543802766740d22691d58d0b21a4ece0081afc456f02053d65a609e',
      100);
  }

  changeServico(servico: Servico): any {
    this.model.servico = servico;
  }

}
