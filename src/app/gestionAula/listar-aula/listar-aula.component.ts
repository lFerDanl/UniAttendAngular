import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AulasService } from '../../services/gestionAulas/aulas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-aula',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-aula.component.html',
  styleUrl: './listar-aula.component.css'
})
export class ListarAulaComponent {
  aulas: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly aulasService: AulasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadAulas();
  }

  async loadAulas() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.aulasService.listarAulas(token);
      if (response && response.statusCode === 200 && response.aulaList) {
        this.aulas = response.aulaList;
      } else {
        this.showError('No se encontraron aulas.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteAula(aulaId: string) {
    Swal.fire({
      title: "Estás seguro?",
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
          await this.aulasService.eliminarAula(aulaId, token);
          // Refresh the aula list after deletion
          this.loadAulas();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Aula Eliminada Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(aulaId: string) {
    this.router.navigate(['/editar-aula', aulaId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
