import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from 'src/app/interface/viaje';
import { ViajeService } from 'src/app/services/viaje.service';


@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.scss']
})
export class ViajeComponent implements OnInit {
  dataSource!: MatTableDataSource<Viaje>;

  displayedColumns: string[] = ['carga_transportada','km_recorrido','dia_semana','provincias_recorridas','dia_regreso','acciones'];//campos de la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _viajeService: ViajeService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarViaje();

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

  cargarViaje() {
    this._viajeService.ConsultarViajes().subscribe(datos => {
      this.dataSource = new MatTableDataSource<Viaje>(datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }

  eliminarViaje(id: string) {
    this._viajeService.eliminar_viaje(id).subscribe(
      () => {
        this._snackBar.open('Viaje eliminado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.cargarViaje();
      },
      (error) => console.error(`Error al eliminar viaje con ID ${id}:`, error)
    );
  }
}
