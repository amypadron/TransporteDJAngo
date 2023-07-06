import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Camion} from 'src/app/interface/camion';
import { CamionService } from 'src/app/services/camion.service';


@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.scss']
})
export class CamionComponent implements OnInit {
  dataSource!: MatTableDataSource<Camion>;

  displayedColumns: string[] = ['chapa','marca','anio_fabricacion','cantidad_reparaciones','gasto_km','acciones'];//campos de la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _camionService: CamionService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarCamion();

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

  cargarCamion() {
    this._camionService.ConsultarCamiones().subscribe(datos => {
      this.dataSource = new MatTableDataSource<Camion>(datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }

  eliminarCamion(id: string) {
    this._camionService.eliminar_camion(id).subscribe(
      () => {
        this._snackBar.open('Camion eliminado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.cargarCamion();
      },
      (error) => console.error(`Error al eliminar camion con ID ${id}:`, error)
    );
  }
}

