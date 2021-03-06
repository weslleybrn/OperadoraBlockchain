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
  MatSelectModule
} from '@angular/material';

import {
  OperadoraService,
  Web3Service,
  ContratosService,
  ServicosService
} from '../services/services.service';

import { AppComponent } from './app.component';
import { WizzardComponent } from './wizzard/wizzard.component';
import { HomeComponent } from './home/home.component';

const SERVICES = [
  OperadoraService,
  Web3Service,
  ContratosService,
  ServicosService
];

@NgModule({
  declarations: [
    AppComponent,
    WizzardComponent,
    HomeComponent
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
    MatSelectModule
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
