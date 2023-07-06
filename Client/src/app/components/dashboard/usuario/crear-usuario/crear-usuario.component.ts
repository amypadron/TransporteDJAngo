import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  form_usuario: FormGroup;
  modo: 'crear' | 'modificar' = 'crear';



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

    if (this.route.snapshot.data['estado'] == 'modificar') {
      // formulario para modificar
      const id = this.route.snapshot.params['id'];

      this.modo = 'modificar';
      this.form_usuario = this.fb.group({
        id: ['id'],
        usuario: ['', Validators.required],
        pasword: ['', Validators.required],
      });
      this.cargarUsuario(id);
    } else {
      // formulario para agregar
      this.modo = 'crear';
      this.form_usuario = this.fb.group({
        usuario: ['', Validators.required],
        pasword: ['', Validators.required],
      });
    }

  }

  ngOnInit(): void {}

  cargarUsuario(id: string){
    console.log(id);
    this._usuarioService.cargarUsuario(id).subscribe({
      next: resp => {
        console.log(resp);
        this.form_usuario.setValue(resp);
      },
      error: () => {
      }
      });
  }

  gestionarUsuario(){
    if (this.modo == 'crear') {
      this.agregarUsuario();
    } else if(this.modo == 'modificar') {
      this.modificarUsuario();
    }else{
        // otra accion
     }
  }

  modificarUsuario(){
    const user: Usuario = {
      id: this.form_usuario.value.id,
      pasword: this.form_usuario.value.pasword,
      usuario: this.form_usuario.value.usuario,

    }
    this._usuarioService.modificarUsuario(user).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/usuarios']);
          this._snackBar.open('Usuario modificado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      (error) => {
        console.error(error);
      }
    );  }

  agregarUsuario() {
    const user: Usuario = {
      id: this.form_usuario.value.id,
      usuario: this.form_usuario.value.usuario,
      pasword: this.form_usuario.value.pasword,
    };
    this._usuarioService.agregarUsuario(user);
    this.router.navigate(['/dashboard/usuarios']);

    this._usuarioService.agregarUsuario(user).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/usuarios']); // redirecionando a una ruta
        this._snackBar.open('Usuario creado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
