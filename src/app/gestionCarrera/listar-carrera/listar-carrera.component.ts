import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarrerasService } from '../../services/gestionCarrera/carreras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-carrera',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-carrera.component.html',
  styleUrl: './listar-carrera.component.css'
})
export class ListarCarreraComponent {
  carreras: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly carrerasService: CarrerasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadCarreras();
  }

  async loadCarreras() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.carrerasService.listarCarreras(token);
      if (response && response.statusCode === 200 && response.carreraList) {
        this.carreras = response.carreraList;
      } else {
        this.showError('No se encontraron carreras.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteCarrera(carreraId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          await this.carrerasService.eliminarCarrera(carreraId, token);
          // Actualizar la lista de carreras después de la eliminación
          this.loadCarreras();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Carrera eliminada exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(carreraId: string) {
    this.router.navigate(['/editar-carrera', carreraId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
