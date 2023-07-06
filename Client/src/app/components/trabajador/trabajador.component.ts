import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';





@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.scss']
})
export class TrabajadorComponent implements OnInit {
  dataSource!: MatTableDataSource<Trabajador>;

  displayedColumns: string[] = ['nombre','ci', 'sexo','telefono',  'direccion_particular', 'anios_experiencia', 'nivel_escolar', 'salario_basico', 'tipo', 'cantidad_viajes', 'evaluacion_mensual','cargo' , 'acciones'];//campos de la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _trabajadorService: TrabajadorService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarTrabajador();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

  }

  cargarTrabajador() {
    this._trabajadorService.ConsultarTrabajadores().subscribe(
      (datos: any) => {
        this.dataSource = new MatTableDataSource<Trabajador>(datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(datos);
      },
      error => {
        console.log(error);
      }
    );
  }


  eliminarTrabajador(id: string) {
    this._trabajadorService.eliminar_trabajador(id).subscribe(
      () => {
        this._snackBar.open('Trabajador eliminado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.cargarTrabajador();
      },
      (error) => console.error(`Error al eliminar trabajador con ID ${id}:`, error)
    );
  }
}
