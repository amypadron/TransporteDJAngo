import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { CamionComponent } from './components/camion/camion.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { CrearTrabajadorComponent } from './components/trabajador/crear-trabajador/crear-trabajador.component';
import { CrearViajeComponent } from './components/viaje/crear-viaje/crear-viaje.component';
import { NominaSalarioComponent } from './components/nomina-salario/nomina-salario.component';
import { CrearNominaSalarioComponent } from './components/nomina-salario/crear-nomina-salario/crear-nomina-salario.component';
import { CrearCamionComponent } from './components/camion/crear-camion/crear-camion.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CamionComponent,
    ViajeComponent,
    TrabajadorComponent,
    CrearTrabajadorComponent,
    CrearViajeComponent,
    NominaSalarioComponent,
    CrearNominaSalarioComponent,
CrearCamionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule

  ],

  providers: [],
  bootstrap: [AppComponent]


})
export class AppModule { }
