import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizzardComponent } from './wizzard/wizzard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: 'wizzard',
  component: WizzardComponent
}, {
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
