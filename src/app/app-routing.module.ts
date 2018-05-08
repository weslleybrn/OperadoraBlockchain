import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizzardComponent } from './wizzard/wizzard.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AdesaoComponent } from './adesao/adesao.component';

const routes: Routes = [{
  path: 'wizzard',
  component: WizzardComponent
}, {
  path: 'cadastro',
  component: CadastroComponent
}, {
  path: 'adesao',
  component: AdesaoComponent
}, {
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
