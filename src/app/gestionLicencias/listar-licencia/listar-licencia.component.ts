import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LicenciasService } from '../../services/gestionLicencias/licencias.service';

@Component({
  selector: 'app-listar-licencia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listar-licencia.component.html',
  styleUrl: './listar-licencia.component.css'
})
export class ListarLicenciaComponent implements OnInit {
  estadoData = {
    estado: '' // Inicializamos el estado vacío
  };

  licencias: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly licenciasService: LicenciasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadLicencias();
  }

  async loadLicencias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.licenciasService.listarLicencias(token);
      if (response && response.statusCode === 200 && response.licenciaList) {
        this.licencias = response.licenciaList;
      } else {
        this.showError('No se encontraron licencias.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async aprobarLicencia(licenciaId: string, estado: string) {
    try {
      const token: any = localStorage.getItem('token');
      this.estadoData.estado=estado;
      const response = await this.licenciasService.aprobarLicencia(licenciaId, this.estadoData, token);
      if (response && response.statusCode === 200) {
        // Actualizar la lista de licencias después de aprobar
        await this.loadLicencias();
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Licencia '+estado+' Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.showError(response.message || 'Error al aprobar la licencia.');
      }
    } catch (error: any) {
      this.showError(error.message || 'Error al aprobar la licencia.');
    }
  }




  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
