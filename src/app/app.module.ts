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
  MatListModule
} from '@angular/material';

import {
  ContratosService,
} from '../services/contratos.service';

import { AppComponent } from './app.component';
import { WizzardComponent } from './wizzard/wizzard.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Web3Service } from '../services/web3.service';

const SERVICES = [
  Web3Service,
  ContratosService,
];

@NgModule({
  declarations: [
    AppComponent,
    WizzardComponent,
    HomeComponent,
    CadastroComponent
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
    MatListModule
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
    MatListModule
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
