import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';

@Component({
  selector: 'app-crear-trabajador',
  templateUrl: './crear-trabajador.component.html',
  styleUrls: ['./crear-trabajador.component.scss'],
})
export class CrearTrabajadorComponent implements OnInit {
  form_trabajador: FormGroup;
  modo: 'crear' | 'modificar' = 'crear';

  niveles: any[] = [
    { value: 'secundario', viewValue: 'Secundario' },
    { value: 'bachiller', viewValue: 'Bachiller' },
    { value: 'universitario', viewValue: 'Universitario' },
  ];
  sexos: any[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' },
  ];

  clasificaciones: any[] = [
    { value: 'chofer', viewValue: 'Chofer' },
    { value: 'administrativo', viewValue: 'Administrativo' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _trabajadorService: TrabajadorService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.data['estado'] == 'modificar') {
      // formulario para modificar
      const id = this.route.snapshot.params['id'];

      this.modo = 'modificar';
      this.form_trabajador = this.fb.group({
        id: ['id'],
        ci: ['', Validators.required],
        sexo: ['', Validators.required],
        telefono: [''],
        direccion_particular: ['', Validators.required],
        nombre: ['', Validators.required],
        anios_experiencia: ['', Validators.required],
        nivel_escolar: ['', Validators.required],
        salario_basico: ['', Validators.required],
        tipo: [''],
        cantidad_viajes: [''],
        evaluacion_mensual: [''],
        cargo: [''],
        clasificacion: ['', Validators.required],
      });
      this.cargarTrabajador(id);
    } else {
      // formulario para agregar
      this.modo = 'crear';
      this.form_trabajador = this.fb.group({
        ci: ['', Validators.required],
        sexo: ['', Validators.required],
        telefono: [''],
        direccion_particular: ['', Validators.required],
        nombre: ['', Validators.required],
        anios_experiencia: ['', Validators.required],
        nivel_escolar: ['', Validators.required],
        salario_basico: ['', Validators.required],
        tipo: [''],
        cantidad_viajes: [''],
        evaluacion_mensual: [''],
        cargo: [''],
        clasificacion: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {}

  cargarTrabajador(id: string) {
    this._trabajadorService.cargarTrabajador(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.form_trabajador.setValue(resp);
      },
      error: () => {},
    });
  }

  gestionarTrabajador() {
    if (this.modo == 'crear') {
      this.agregarTrabajador();
    } else if (this.modo == 'modificar') {
      this.modificarTrabajador();
    } else {
      // otra accion
    }
  }

  modificarTrabajador() {
    const trabajador: Trabajador = {
      id: this.form_trabajador.value.id,
      ci: this.form_trabajador.value.ci,
      sexo: this.form_trabajador.value.sexo,
      telefono: this.form_trabajador.value.telefono,
      direccion_particular: this.form_trabajador.value.direccion_particular,
      nombre: this.form_trabajador.value.nombre,
      anios_experiencia: this.form_trabajador.value.anios_experiencia,
      nivel_escolar: this.form_trabajador.value.nivel_escolar,
      salario_basico: this.form_trabajador.value.salario_basico,
      chofer: {
        tipo: this.form_trabajador.value.tipo,
        cantidad_viajes: this.form_trabajador.value.cantidad_viajes,
        evaluacion_mensual: this.form_trabajador.value.evaluacion_mensual,
      },
      administrativo: {
        cargo: this.form_trabajador.value.cargo,
      },
    };
    this._trabajadorService.modificarTrabajador(trabajador).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/trabajadores']);
        this._snackBar.open('Trabajador modificado correctamente', '', {
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




  agregarTrabajador() {
    const trabajador: Trabajador = {
      id: this.form_trabajador.value.id,
      ci: this.form_trabajador.value.ci,
      sexo: this.form_trabajador.value.sexo,
      telefono: this.form_trabajador.value.telefono,
      direccion_particular: this.form_trabajador.value.direccion_particular,
      nombre: this.form_trabajador.value.nombre,
      anios_experiencia: this.form_trabajador.value.anios_experiencia,
      nivel_escolar: this.form_trabajador.value.nivel_escolar,
      salario_basico: this.form_trabajador.value.salario_basico,
      chofer: {
        tipo: this.form_trabajador.value.tipo,
        cantidad_viajes: this.form_trabajador.value.cantidad_viajes,
        evaluacion_mensual: this.form_trabajador.value.evaluacion_mensual,
      },
      administrativo: {
        cargo: this.form_trabajador.value.cargo,
      },
    };
    console.log(`Lo que se recibe x cargo ${this.form_trabajador.value.cargo}`);
    if(this.form_trabajador.value.clasificacion === 'chofer') {
      console.log('chofer');
      trabajador.administrativo = {};
    } else {
      console.log('administrativo');
      trabajador.chofer = {};
    }
    this._trabajadorService.agregarTrabajador(trabajador);
    this.router.navigate(['/dashboard/trabajadores']);

    this._trabajadorService.agregarTrabajador(trabajador).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/trabajadores']); // redirecionando a una ruta
        this._snackBar.open('Trabajador creado correctamente', '', {
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
