import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProgramacionesService } from '../../services/gestionProgramacion/programaciones.service';
import Swal from 'sweetalert2';
import { ProgramacionHorariosService } from '../../services/gestionProgramacionHorario/programacion-horarios.service';

@Component({
  selector: 'app-listar-programacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-programacion.component.html',
  styleUrl: './listar-programacion.component.css'
})
export class ListarProgramacionComponent {
  programaciones: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly programacionesService: ProgramacionesService,
    private readonly programacionesHorariosService: ProgramacionHorariosService,
    private readonly router: Router
  ) { }

  

  ngOnInit(): void {
    this.loadProgramaciones();
  }

  async loadProgramaciones() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.programacionesService.listarProgramaciones(token);
      if (response && response.statusCode === 200 && response.programacionList) {
        this.programaciones = response.programacionList;
        // Cargar las programaciones horarias para cada programación académica
        await this.loadProgramacionesHorarios();
        await this.loadCarreras();
      } else {
        this.showError('No se encontraron programaciones.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadProgramacionesHorarios() {
    try {
      const token: any = localStorage.getItem('token');
      for (const programacion of this.programaciones) {
        const response = await this.programacionesService.getProgramacionHorarios(programacion.id, token);
        if (response && response.statusCode === 200 && response.programacionHorarios) {
          programacion.programacionHorarios = response.programacionHorarios;
        }
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadCarreras() {
    try {
      const token: any = localStorage.getItem('token');
      for (const programacion of this.programaciones) {
        const response = await this.programacionesService.getProgramacionCarreras(programacion.id, token);
        if (response && response.statusCode === 200 && response.carreraList) {
          programacion.carreras = response.carreraList;
        }
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteProgramacion(programacionId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          await this.programacionesService.eliminarProgramacion(programacionId, token);
          // Refresca la lista de programaciones después de eliminar
          this.loadProgramaciones();

          // Muestra un mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Programación Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(programacionId: string) {
    this.router.navigate(['/editar-programacion', programacionId]);
  }

  async deleteProgramacionHorario(programacionHorarioId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          await this.programacionesHorariosService.eliminarProgramacionHorario(programacionHorarioId, token);
          // Refresca la lista de programaciones después de eliminar
          this.loadProgramacionesHorarios();
  
          // Muestra un mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Programación Horario Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }
  
  navigateToUpdateProgramacionHorario(programacionHorarioId: string) {
    this.router.navigate(['/editar-programacion-horario', programacionHorarioId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
