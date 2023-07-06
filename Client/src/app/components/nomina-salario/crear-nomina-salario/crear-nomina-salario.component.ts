
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Nomina } from 'src/app/interface/nomina_salario';
import { NominaSalarioService } from 'src/app/services/nomina-salario.service';

@Component({
  selector: 'app-crear-nomina-salario',
  templateUrl: './crear-nomina-salario.component.html',
  styleUrls: ['./crear-nomina-salario.component.scss']
})


export class CrearNominaSalarioComponent implements OnInit {
  form_nomina: FormGroup;
  modo: 'crear' | 'modificar' = 'crear';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _nominaService: NominaSalarioService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.data['estado'] == 'modificar') {
      // formulario para modificar
      const id = this.route.snapshot.params['id'];

      this.modo = 'modificar';
      this.form_nomina = this.fb.group({
        id: ['id'],
        cantidad_dias: ['', Validators.required],
        salario: ['', Validators.required],
        mes: ['', Validators.required],
      });
      this.cargarNomina(id);
    } else {
      // formulario para agregar
      this.modo = 'crear';
      this.form_nomina = this.fb.group({
        cantidad_dias: ['', Validators.required],
        salario: ['', Validators.required],
        mes: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {}

  cargarNomina(id: string) {
    console.log(id);
    this._nominaService.cargarNomina(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.form_nomina.setValue(resp);
      },
      error: () => {},
    });
  }

  gestionarNomina() {
    if (this.modo == 'crear') {
      this.agregarNomina();
    } else if (this.modo == 'modificar') {
      this.modificarNomina();
    } else {
      // otra accion
    }
  }

  modificarNomina() {
    const nomina: Nomina = {
      id: this.form_nomina.value.id,
      cantidad_dias: this.form_nomina.value.cantidad_dias,
      salario: this.form_nomina.value.salario,
      mes: this.form_nomina.value.mes,
    };
    this._nominaService.modificarNomina(nomina).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/nominas']);
        this._snackBar.open('Nómina modificado correctamente', '', {
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

  agregarNomina() {
    const nomina: Nomina = {
      id: this.form_nomina.value.id,
      cantidad_dias: this.form_nomina.value.cantidad_dias,
      salario: this.form_nomina.value.salario,
      mes: this.form_nomina.value.mes,
    };
    this._nominaService.agregarNomina(nomina);
    this.router.navigate(['/dashboard/nominas']);

    this._nominaService.agregarNomina(nomina).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/nominas']); // redirecionando a una ruta
        this._snackBar.open('Nómina creado correctamente', '', {
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

