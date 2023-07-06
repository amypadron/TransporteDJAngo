import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { TrabajadorComponent } from '../trabajador/trabajador.component';
import { CrearTrabajadorComponent } from '../trabajador/crear-trabajador/crear-trabajador.component';
import { CrearViajeComponent } from '../viaje/crear-viaje/crear-viaje.component';
import { ViajeComponent } from '../viaje/viaje.component';
import { CamionComponent } from '../camion/camion.component';
import { CrearCamionComponent } from '../camion/crear-camion/crear-camion.component';
import { NominaSalarioComponent } from '../nomina-salario/nomina-salario.component';
import { CrearNominaSalarioComponent } from '../nomina-salario/crear-nomina-salario/crear-nomina-salario.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'usuarios/crear-usuario', component: CrearUsuarioComponent, data: {
      estado: 'crear'
    }},
    {path: 'usuarios/modificar/:id', component: CrearUsuarioComponent, data: {
      estado: 'modificar'
    }},
    {path: 'trabajadores', component: TrabajadorComponent},
    {path: 'trabajadores/crear-trabajador', component: CrearTrabajadorComponent, data: {
      estado: 'crear'
    }},
    {path: 'trabajadores/modificar/:id', component: CrearTrabajadorComponent, data: {
      estado: 'modificar'
    }},

    {path: 'viajes', component: ViajeComponent},
    {path: 'viajes/crear-viaje', component: CrearViajeComponent, data: {
      estado: 'crear'
    }},
    {path: 'viajes/modificar/:id', component: CrearViajeComponent, data: {
      estado: 'modificar'
    }},

    {path: 'camiones', component: CamionComponent},
    {path: 'camiones/crear-camion', component: CrearCamionComponent, data: {
      estado: 'crear'
    }},
    {path: 'camiones/modificar/:id', component: CrearCamionComponent, data: {
      estado: 'modificar'
    }},

    {path: 'nominas', component: NominaSalarioComponent},
    {path: 'nominas/crear-nominaSalario', component: CrearNominaSalarioComponent, data: {
      estado: 'crear'
    }},
    {path: 'nominas/modificar/:id', component: CrearNominaSalarioComponent, data: {
      estado: 'modificar'
    }},

  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DashboardRoutingModule { }

