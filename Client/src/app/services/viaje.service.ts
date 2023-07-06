import { Injectable } from '@angular/core';
import { Viaje } from '../interface/viaje';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  servidor = "http://localhost:8000/api";


  cargar_viaje(){

    return this.ConsultarViajes();
  }
  constructor(private servicio:HttpClient) { }

  eliminar_viaje(id: string){
    return this.servicio.delete(`${this.servidor}/viaje/deleteViaje/${id}`);
  }

  ConsultarViajes(): Observable<any>{
    return this.servicio.get(`${this.servidor}/viaje`);
  }

  agregarViaje(viaje: Viaje){
    return this.servicio.post(`${this.servidor}/viaje/createViaje`, viaje);
  }

  modificarViaje(viaje: Viaje){
    console.log(viaje.id);
    return this.servicio.post(`${this.servidor}/viaje/updateViaje/${viaje.id}`, viaje);
  }

  cargarViaje(id: string) {
    return this.servicio.get<Viaje>(`${this.servidor}/viaje/${id}`).pipe(
      map(r => ({
        id: r.id,
        carga_transportada: r.carga_transportada,
        km_recorrido: r.km_recorrido,
        dia_semana: r.dia_semana,
        provincias_recorridas: r.provincias_recorridas,
        dia_regreso: r.dia_regreso,
      }))
    );
  }

  }

