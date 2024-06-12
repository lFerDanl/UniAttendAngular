import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MateriasService } from '../../services/gestionMateria/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-materia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-materia.component.html',
  styleUrl: './listar-materia.component.css'
})
export class ListarMateriaComponent {
  materias: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly materiaService: MateriasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }

  async loadMaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.materiaService.listarMaterias(token);
      if (response && response.statusCode === 200 && response.materiaList) {
        this.materias = response.materiaList;
      } else {
        this.showError('No se encontraron materias.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteMateria(materiaId: string) {
    Swal.fire({
      title: "¿Estás Seguro?",
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
          await this.materiaService.eliminarMateria(materiaId, token);
          // Refrescar la lista de materias después de la eliminación
          this.loadMaterias();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: '¡Materia Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(materiaId: string) {
    this.router.navigate(['/editar-materia', materiaId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
