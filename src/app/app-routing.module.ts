import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizzardComponent } from './wizzard/wizzard.component';

const routes: Routes = [{
  path: 'wizzard',
  component: WizzardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
