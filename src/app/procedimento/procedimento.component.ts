import { Component, OnInit } from '@angular/core';
import { Contrato, ContratosService, Beneficiario } from '../../services/contratos.service';
import { ServicosService, Servico } from '../../services/servicos.service';
import { AutorizadorService } from '../../services/autorizador.service';
import { Prestador, PrestadorService } from '../../services/prestador.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.css']
})
export class ProcedimentoComponent implements OnInit {

  prestador: Prestador;

  constructor(
    private prestadorService: PrestadorService,
    private servicosService: ServicosService,
    private autorizadorService: AutorizadorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): any {
    this.prestadorService
      .getPrestador()
      .subscribe(prestador => {
        this.prestador = prestador;
      });
  }

  async executar() {

    await this.autorizadorService.realizarExecucao(
      await this.prestadorService.getEndereco(), 
      await this.servicosService.getEndereco(),
      environment.carteiraPrestador,
      1
    );

    this.autorizadorService.consultarSaldo().then(
      s => {
        console.log(s);
      }
    );

    await this.autorizadorService.confirmarExecucao(1, environment.carteiraPrestador);

    this.router.navigate(['/reciboprocedimento']);
  }
}
