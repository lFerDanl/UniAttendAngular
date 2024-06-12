import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ProgramacionesService } from '../../services/gestionProgramacion/programaciones.service';
import { AsistenciasService } from '../../services/gestionAsistencias/asistencias.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.css'
})
export class ClasesComponent {

  clases: any[] = [];
  errorMessage: string = '';

  constructor(
    private programacionesService: ProgramacionesService,
    private asistenciasService: AsistenciasService,
  ) { }

  ngOnInit(): void {
    this.loadClasesDeHoy();
  }

  async loadClasesDeHoy() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.programacionesService.listarClasesDeHoy(token);
      if (response && response.statusCode === 200 && response.programacionHorarios) {
        this.clases = response.programacionHorarios;
      } else {
        this.showError('No se encontraron clases para hoy.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async registrarAsistencia(programacionHorarioId: string) {
    Swal.fire({
      title: "Confirmar Asistencia?",
      text: "¿Deseas registrar tu asistencia para esta clase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Registrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          // console.log(token);
          const response = await this.asistenciasService.registrarAsistencia(programacionHorarioId, token);
          if (response && response.statusCode === 200) {
            // Mostrar mensaje de éxito con SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Asistencia registrada exitosamente!',
              showConfirmButton: false,
              timer: 1500
            });
            // Recargar las clases del día para reflejar los cambios, si es necesario
            this.loadClasesDeHoy();
          } else {
            this.showError('Error al registrar la asistencia: ' + response.message);
          }
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
