import { Nomina } from './../interface/nomina_salario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominaSalarioService {

  servidor = "http://localhost:8000/api";


  cargar_nominas(){

    return this.ConsultarNominas();
  }
  constructor(private servicio:HttpClient) { }

  eliminar_nomina(id: string){

    return this.servicio.delete(`${this.servidor}/nomina_salarios/deleteNomina_Salario/${id}`);
  }

  ConsultarNominas(): Observable<any>{
    return this.servicio.get(`${this.servidor}/nomina_salario`);
  }

  agregarNomina(nomina: Nomina){
    return this.servicio.post(`${this.servidor}/nomina_salarios/createNomina_Salario`, nomina);
  }

  modificarNomina(nomina: Nomina){
    console.log(nomina.id);
    return this.servicio.post(`${this.servidor}/nomina_salarios/updateNomina_Salario/${nomina.id}`, nomina);
  }

  cargarNomina(id: string) {
    return this.servicio.get<Nomina>(`${this.servidor}/nomina_salarios/${id}`).pipe(
      map(r => ({
        id: r.id,
        cantidad_dias: r.cantidad_dias,
        salario: r.salario,
        mes: r.mes,

      }))
    );
  }

  }




