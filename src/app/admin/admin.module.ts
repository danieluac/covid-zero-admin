import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './livro/home.component';
import { ProfissionalSaudeComponent } from './livro/saude/profissional-saude.component';
import { ProvinciaComponent } from './livro/provincia/provincia.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent, 
    HeaderComponent, 
    HomeComponent, 
    ProfissionalSaudeComponent,
    ProvinciaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule, MatSnackBarModule, MatIconModule
  ]
})
export class AdminModule { }
