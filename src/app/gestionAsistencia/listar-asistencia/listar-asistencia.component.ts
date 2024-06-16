import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AsistenciasService } from '../../services/gestionAsistencias/asistencias.service';

@Component({
  selector: 'app-listar-asistencia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listar-asistencia.component.html',
  styleUrl: './listar-asistencia.component.css'
})
export class ListarAsistenciaComponent {

  asistencias: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly asistenciasService: AsistenciasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadAsistencias();
  }

  async loadAsistencias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.asistenciasService.listarAsistencias(token);
      if (response && response.statusCode === 200 && response.asistenciaList) {
        console.log(response.asistenciaList);
        this.asistencias = response.asistenciaList;
      } else {
        this.showError('No se encontraron asistencias.');
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
