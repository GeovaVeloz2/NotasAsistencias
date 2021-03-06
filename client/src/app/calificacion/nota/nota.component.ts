import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import alerta from 'sweetalert2';

import { Actividad } from 'src/app/models/actividad';
import { AsignaturaParalelo } from 'src/app/models/asignaturaParalelo';
import { Estudiante } from 'src/app/models/estudiante';
import { TipoActividad } from '../../models/tipoActividad';

import { ActividadService } from 'src/app/parametrizacion/actividad.service';
import { AsignaturaService } from '../../parametrizacion/asignatura.service';
import { EstudianteService } from '../../calificacion/estudiante.service';
import { TipoActividadService } from '../../parametrizacion/tipo-actividad.service';
import { UsuarioService } from '../../global/usuario.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {
  idAsignaturaParalelo: number;
  actividades: Actividad[];
  asignaturasParalelo: AsignaturaParalelo[];
  estudiantes: Estudiante[];
  tiposActividad: TipoActividad[];

  constructor(
    private spinner: NgxSpinnerService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private estudianteService: EstudianteService,
    private tipoActividadService: TipoActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getAsignaturas();
  }

  getActividades(): void {
    if (this.idAsignaturaParalelo == null) {
      alerta.fire({
        title: 'Valor inválido',
        position: 'top-end',
        type: 'warning',
        text: 'Seleccione la asignatura',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    this.spinner.show();
    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.actividadService.getActividades(this.idAsignaturaParalelo).subscribe(
      response => {
        this.actividades = response as Actividad[];
        this.spinner.hide();
      },
      error => {
        alerta.fire({
          title: 'Consulta',
          position: 'top-end',
          type: 'error',
          text: 'No se pudo consultar los datos',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getAsignaturas(): void {
    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.asignaturaService.getAsignaturas(idDocente).subscribe(
      response => {
        this.asignaturasParalelo = response as AsignaturaParalelo[];
        this.spinner.hide();
      },
      error => {
        alerta.fire({
          title: 'Consulta',
          position: 'top-end',
          type: 'error',
          text: 'No se pudo consultar los datos',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getEstudiantes(): void {
    this.estudianteService.getEstudiantes(this.idAsignaturaParalelo).subscribe(
      response => {
        this.estudiantes = response as Estudiante[];
        this.spinner.hide();
      },
      error => {
        alerta.fire({
          title: 'Consulta',
          position: 'top-end',
          type: 'error',
          text: 'No se pudo consultar los datos',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getTiposActividad(): void {
    this.tipoActividadService.getTiposActividad().subscribe(
      response => {
        this.tiposActividad = response as TipoActividad[];
        this.spinner.hide();
      },
      error => {
        alerta.fire({
          title: 'Consulta',
          position: 'top-end',
          type: 'error',
          text: 'No se pudo consultar los datos',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  asignaturaParaleloChange(idAsignaturaParalelo: number): void {
    this.getActividades();
  }

  grabar(): void {}
}
