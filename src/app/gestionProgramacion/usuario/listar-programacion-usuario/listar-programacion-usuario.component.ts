import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramacionesService } from '../../../services/gestionProgramacion/programaciones.service';
import { ProgramacionHorariosService } from '../../../services/gestionProgramacionHorario/programacion-horarios.service';

@Component({
  selector: 'app-listar-programacion-usuario',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listar-programacion-usuario.component.html',
  styleUrl: './listar-programacion-usuario.component.css'
})
export class ListarProgramacionUsuarioComponent {
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
      const response = await this.programacionesService.listarProgramacionesPorUsuarioActual(token);
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
  
  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
