import { Injectable } from '@angular/core';
import { Camion } from '../interface/camion';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamionService {

  servidor = "http://localhost:8000/api";


  cargar_camiones(){

    return this.ConsultarCamiones();
  }
  constructor(private servicio:HttpClient) { }

  eliminar_camion(id: string){

    return this.servicio.delete(`${this.servidor}/camions/deleteCamion/${id}`);
  }

  ConsultarCamiones(): Observable<any>{
    return this.servicio.get(`${this.servidor}/camion`);
  }

  agregarCamion(camion: Camion){
    return this.servicio.post(`${this.servidor}/camions/createCamion`, camion);
  }

  modificarCamion(camion: Camion){
    console.log(camion.id);
    return this.servicio.post(`${this.servidor}/camions/updateCamion/${camion.id}`, camion);
  }

  cargarCamion(id: string) {
    return this.servicio.get<Camion>(`${this.servidor}/camions/${id}`).pipe(
      map(r => ({
        id: r.id,
        chapa: r.chapa,
        marca: r.marca,
        // anio_fabricacion: r.anio_fabricacion,
        // cantidad_reparaciones: r.antiguo.cantidad_reparaciones,
        // gasto_km: r.moderno.gasto_km,

      }))
    );
  }

  }



