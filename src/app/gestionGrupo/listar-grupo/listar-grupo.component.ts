import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GruposService } from '../../services/gestionGrupo/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-grupo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-grupo.component.html',
  styleUrl: './listar-grupo.component.css'
})
export class ListarGrupoComponent {
  grupos: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly grupoService: GruposService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadGrupos();
  }

  async loadGrupos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.grupoService.listarGrupos(token);
      if (response && response.statusCode === 200 && response.grupoList) {
        this.grupos = response.grupoList;
      } else {
        this.showError('No se encontraron grupos.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteGrupo(grupoId: string) {
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
          await this.grupoService.eliminarGrupo(grupoId, token);
          // Actualizar la lista de grupos después de la eliminación
          this.loadGrupos();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Grupo eliminado exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(grupoId: string) {
    this.router.navigate(['/editar-grupo', grupoId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
