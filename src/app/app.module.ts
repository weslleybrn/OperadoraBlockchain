import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {
  MatFormFieldModule,
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatButtonToggle,
  MatButtonToggleModule,
  MatButtonToggleGroup,
  MatSelect,
  MatSelectModule,
  MatListModule,
  MatGridListModule,
  MatSliderModule,
  MatStepper
} from '@angular/material';

import {
  ContratosService,
} from '../services/contratos.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Web3Service } from '../services/web3.service';
import { AdesaoComponent } from './adesao/adesao.component';
import { AutorizacaoComponent } from './autorizacao/autorizacao.component';
import { ReciboContratoComponent } from './recibo-contrato/recibo-contrato.component';
import { ProcedimentoComponent } from './procedimento/procedimento.component';
import { ReciboProcedimentoComponent } from './recibo-procedimento/recibo-procedimento.component';

const SERVICES = [
  Web3Service,
  ContratosService,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    AdesaoComponent,
    AutorizacaoComponent,
    ReciboContratoComponent,
    ProcedimentoComponent,
    ReciboProcedimentoComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
