import { TrabajadorFull } from './../interface/trabajador2';
import { Chofer } from './../interface/chofer';
import { Injectable } from '@angular/core';
import { Trabajador } from '../interface/trabajador';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  servidor = "http://localhost:8000";


  cargar_trabajador(){

    return this.ConsultarTrabajadores();
  }
  constructor(private servicio:HttpClient) { }

  eliminar_trabajador(id: string){
    return this.servicio.delete(`${this.servidor}/trabajador/${id}/eliminar/`);
  }

  ConsultarTrabajadores(): Observable<any>{
    return this.servicio.get<any>(`${this.servidor}/listar-trabajadores/`);
  }

  agregarTrabajador(trabajador: Trabajador){
    return this.servicio.post(`${this.servidor}/crear-trabajador/`, trabajador);
  }

  modificarTrabajador(trabajador: Trabajador){
    console.log(trabajador.id);
    return this.servicio.post(`${this.servidor}/trabajador/${trabajador.id}/editar/`, trabajador);
  }

  cargarTrabajador(trabajador_id: string) {
      return this.servicio.get<TrabajadorFull>(`${this.servidor}/trabajador/${trabajador_id}/obtener/`).pipe(
      map(r => ({
        id: r.id,
        ci: r.ci,
        sexo: r.sexo,
        telefono: r.telefono,
        direccion_particular: r.direccion_particular,
        nombre: r.nombre,
        anios_experiencia: r.anios_experiencia,
        nivel_escolar: r.nivel_escolar,
        salario_basico: r.salario_basico,
        tipo: r.chofer ? r.chofer.tipo : "" ,
        cantidad_viajes: r.chofer ? r.chofer.cantidad_viajes : "" ,
        evaluacion_mensual: r.chofer ? r.chofer.evaluacion_mensual : "" ,
        clasificacion: r.chofer ? (r.chofer.cantidad_viajes > 5 ? "A" : "B") : "",
        cargo: r.administrativo ? r.administrativo.cargo : "" ,

      }))
    );


  }

  }



