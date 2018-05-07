import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WizzardComponent } from './wizzard/wizzard.component';

import { MatFormFieldModule,
  MatStepperModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { OperadoraService,
  Web3Service,
  ContratosService} from '../services/services.service';

const SERVICES = [
  OperadoraService,
  Web3Service,
  ContratosService
];

@NgModule({
  declarations: [
    AppComponent,
    WizzardComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule {}
