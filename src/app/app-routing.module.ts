import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AdesaoComponent } from './adesao/adesao.component';
import { AutorizacaoComponent } from './autorizacao/autorizacao.component';
import { ReciboContratoComponent } from './recibo-contrato/recibo-contrato.component';
import { ProcedimentoComponent } from './procedimento/procedimento.component';
import { ReciboProcedimentoComponent } from './recibo-procedimento/recibo-procedimento.component';

const routes: Routes = [{
  path: 'autorizacao',
  component: AutorizacaoComponent
}, {
  path: 'cadastro',
  component: CadastroComponent
}, {
  path: 'adesao',
  component: AdesaoComponent
}, {
  path: 'recibocontrato',
  component: ReciboContratoComponent
}, {
  path: 'procedimento',
  component: ProcedimentoComponent
}, {
  path: 'reciboprocedimento',
  component: ReciboProcedimentoComponent
}, {
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
