import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LicenciasService } from '../../services/gestionLicencias/licencias.service';

@Component({
  selector: 'app-listar-licencia-usuario',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listar-licencia-usuario.component.html',
  styleUrl: './listar-licencia-usuario.component.css'
})
export class ListarLicenciaUsuarioComponent implements OnInit {
  licencias: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly licenciasService: LicenciasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadLicenciasDelUsuarioActual();
  }

  async loadLicenciasDelUsuarioActual() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.licenciasService.listarLicenciasDelUsuarioActual(token);
      if (response && response.statusCode === 200 && response.licenciaList) {
        this.licencias = response.licenciaList;
      } else {
        this.showError('No se encontraron licencias.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteLicencia(licenciaId: string) {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: 'No podrás deshacer los cambios.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token no encontrado');
          }
          await this.licenciasService.eliminarLicencia(licenciaId, token);
          // Actualizar la lista de licencias después de la eliminación
          this.loadLicenciasDelUsuarioActual();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Licencia Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(licenciaId: string) {
    this.router.navigate(['/editar-licencia', licenciaId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
