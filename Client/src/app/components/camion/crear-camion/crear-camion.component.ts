import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Camion } from 'src/app/interface/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-crear-camion',
  templateUrl: './crear-camion.component.html',
  styleUrls: ['./crear-camion.component.scss'],
})
export class CrearCamionComponent implements OnInit {
  form_camion: FormGroup;
  modo: 'crear' | 'modificar' = 'crear';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _camionService: CamionService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.data['estado'] == 'modificar') {
      // formulario para modificar
      const id = this.route.snapshot.params['id'];

      this.modo = 'modificar';
      this.form_camion = this.fb.group({
        id: ['id'],
        chapa: ['', Validators.required],
        marca: ['', Validators.required],
        anio_fabricacion: [''],
        cantidad_reparaciones: [''],
        gasto_km: [''],
      });
      this.cargarCamion(id);
    } else {
      // formulario para agregar
      this.modo = 'crear';
      this.form_camion = this.fb.group({
        chapa: ['', Validators.required],
        marca: ['', Validators.required],
        anio_fabricacion: [''],
        cantidad_reparaciones: [''],
        gasto_km: [''],
      });
    }
  }

  ngOnInit(): void {}

  cargarCamion(id: string) {
    console.log(id);
    this._camionService.cargarCamion(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.form_camion.setValue(resp);
      },
      error: () => {},
    });
  }

  gestionarCamion() {
    if (this.modo == 'crear') {
      this.agregarCamion();
    } else if (this.modo == 'modificar') {
      this.modificarCamion();
    } else {
      // otra accion
    }
  }

  modificarCamion() {
    const camion: Camion = {
      id: this.form_camion.value.id,
      chapa: this.form_camion.value.chapa,
      marca: this.form_camion.value.marca,
      antiguo: {
        anio_fabricacion: this.form_camion.value.anio_fabricacion,
        cantidad_reparaciones: this.form_camion.value.cantidad_reparaciones,
      },
      moderno: {
        gasto_km: this.form_camion.value.gasto_km,
      },
    };
    this._camionService.modificarCamion(camion).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/camiones']);
        this._snackBar.open('Camion modificado correctamente', '', {
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

  agregarCamion() {
    const camion: Camion = {
      id: this.form_camion.value.id,
      chapa: this.form_camion.value.chapa,
      marca: this.form_camion.value.marca,
      antiguo: {
        anio_fabricacion: this.form_camion.value.anio_fabricacion,
        cantidad_reparaciones: this.form_camion.value.cantidad_reparaciones,
      },
      moderno: {
        gasto_km: this.form_camion.value.gasto_km,
      },
    };
    this._camionService.agregarCamion(camion);
    this.router.navigate(['/dashboard/camiones']);

    this._camionService.agregarCamion(camion).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/camiones']); // redirecionando a una ruta
        this._snackBar.open('Camion creado correctamente', '', {
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
