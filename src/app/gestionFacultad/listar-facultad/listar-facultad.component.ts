import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FacultadesService } from '../../services/gestionFacultad/facultades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-facultad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-facultad.component.html',
  styleUrl: './listar-facultad.component.css'
})
export class ListarFacultadComponent {
  facultades: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly facultadService: FacultadesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadFacultades();
  }

  async loadFacultades() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.facultadService.listarFacultades(token);
      if (response && response.statusCode === 200 && response.facultadList) {
        this.facultades = response.facultadList;
      } else {
        this.showError('No se encontraron facultades.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteFacultad(facultadId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          await this.facultadService.eliminarFacultad(facultadId, token);
          // Refresh the facultad list after deletion
          this.loadFacultades();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Facultad Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(facultadId: string) {
    this.router.navigate(['/editar-facultad', facultadId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
