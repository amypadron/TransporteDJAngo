import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  servidor = "http://localhost:8000/api";


  cargar_usuarios(){

    return this.ConsultarUsuarios();
  }
  constructor(private servicio:HttpClient) { }

  eliminar_usuario(id: string){
    //localhost:3000/api/users/deleteUser
    return this.servicio.delete(`${this.servidor}/users/deleteUser/${id}`);
  }

  ConsultarUsuarios(): Observable<any>{
    return this.servicio.get(`${this.servidor}/user`);
  }

  agregarUsuario(usuario: Usuario){
    return this.servicio.post(`${this.servidor}/users/createUser`, usuario);
  }

  modificarUsuario(usuario: Usuario){
    console.log(usuario.id);
    return this.servicio.post(`${this.servidor}/users/updateUser/${usuario.id}`, usuario);
  }

  cargarUsuario(id: string) {
    return this.servicio.get<Usuario>(`${this.servidor}/users/${id}`).pipe(
      map(r => ({
        id: r.id,
        pasword: r.pasword,
        usuario: r.usuario,

      }))
    );
  }

  }



