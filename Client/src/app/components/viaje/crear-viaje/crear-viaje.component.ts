import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Viaje } from 'src/app/interface/viaje';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.component.html',
  styleUrls: ['./crear-viaje.component.scss'],
})
export class CrearViajeComponent implements OnInit {
  form_viaje: FormGroup;
  modo: 'crear' | 'modificar' = 'crear';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _viajeService: ViajeService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.data['estado'] == 'modificar') {
      // formulario para modificar
      const id = this.route.snapshot.params['id'];

      this.modo = 'modificar';
      this.form_viaje = this.fb.group({
        id: ['id'],
        carga_transportada: ['', Validators.required],
        km_recorrido: ['', Validators.required],
        dia_semana: ['', Validators.required],
        provincias_recorridas: ['', Validators.required],
        dia_regreso: ['', Validators.required],
      });
      this.cargarViaje(id);
    } else {
      // formulario para agregar
      this.modo = 'crear';
      this.form_viaje = this.fb.group({
        carga_transportada: ['', Validators.required],
        km_recorrido: ['', Validators.required],
        dia_semana: ['', Validators.required],
        provincias_recorridas: ['', Validators.required],
        dia_regreso: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {}

  cargarViaje(id: string) {
    console.log(id);
    this._viajeService.cargarViaje(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.form_viaje.setValue(resp);
      },
      error: () => {},
    });
  }

  gestionarViaje() {
    if (this.modo == 'crear') {
      this.agregarViaje();
    } else if (this.modo == 'modificar') {
      this.modificarViaje();
    } else {
      // otra accion
    }
  }

  modificarViaje() {
    const viaje: Viaje = {
      id: this.form_viaje.value.id,
      carga_transportada: this.form_viaje.value.carga_transportada,
      km_recorrido: this.form_viaje.value.km_recorrido,
      dia_semana: this.form_viaje.value.dia_semana,
      provincias_recorridas: this.form_viaje.value.provincias_recorridas,
      dia_regreso: this.form_viaje.value.dia_regreso,
    };
    this._viajeService.modificarViaje(viaje).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/viajes']);
        this._snackBar.open('Viaje modificado correctamente', '', {
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

  agregarViaje() {
    const viaje: Viaje = {
      id: this.form_viaje.value.id,
      carga_transportada: this.form_viaje.value.carga_transportada,
      km_recorrido: this.form_viaje.value.km_recorrido,
      dia_semana: this.form_viaje.value.dia_semana,
      provincias_recorridas: this.form_viaje.value.provincias_recorridas,
      dia_regreso: this.form_viaje.value.dia_regreso,
    };
    this._viajeService.agregarViaje(viaje);
    this.router.navigate(['/dashboard/viajes']);

    this._viajeService.agregarViaje(viaje).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/viajes']); // redirecionando a una ruta
        this._snackBar.open('Viaje creado correctamente', '', {
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
