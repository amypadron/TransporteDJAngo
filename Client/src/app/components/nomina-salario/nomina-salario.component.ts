import { Nomina } from './../../interface/nomina_salario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NominaSalarioService } from 'src/app/services/nomina-salario.service';

@Component({
  selector: 'app-nomina-salario',
  templateUrl: './nomina-salario.component.html',
  styleUrls: ['./nomina-salario.component.scss']
})

export class NominaSalarioComponent implements OnInit {
  dataSource!: MatTableDataSource<Nomina>;

  displayedColumns: string[] = ['cantidad_dias','salario','mes', 'acciones'];//campos de la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _nominaService: NominaSalarioService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarNomina();

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

  cargarNomina() {
    this._nominaService.ConsultarNominas().subscribe(datos => {
      this.dataSource = new MatTableDataSource<Nomina>(datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }

  eliminarNomina(id: string) {
    this._nominaService.eliminar_nomina(id).subscribe(
      () => {
        this._snackBar.open('Nomina eliminado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.cargarNomina();
      },
      (error) => console.error(`Error al eliminar nomina con ID ${id}:`, error)
    );
  }
}


