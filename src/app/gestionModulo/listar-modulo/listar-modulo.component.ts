import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ModulosService } from '../../services/gestionModulo/modulos.service';
import { AulasService } from '../../services/gestionAulas/aulas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-modulo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-modulo.component.html',
  styleUrl: './listar-modulo.component.css'
})
export class ListarModuloComponent {
  modulos: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly modulosService: ModulosService,
    private readonly aulasService: AulasService, 
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadModulos();
  }

  async loadModulos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.modulosService.listarModulos(token);
      if (response && response.statusCode === 200 && response.moduloList) {
        this.modulos = response.moduloList;
        // Carga las aulas para cada módulo
        await this.loadAulasForModulos();
      } else {
        this.showError('No se encontraron módulos.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadAulasForModulos() {
    try {
      const token: any = localStorage.getItem('token');
      for (const modulo of this.modulos) {
        const response = await this.modulosService.getAulasByModuloId(modulo.id, token);
        if (response && response.statusCode === 200 && response.aulas) {
          modulo.aulas = response.aulas;
        } else {
          modulo.aulas = [];
        }
      }
    } catch (error: any) {
      console.error("Error loading aulas for modulos:", error);
    }
  }
  async deleteModulo(moduloId: string) {
    Swal.fire({
      title: "¿Estás Seguro?",
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
          await this.modulosService.eliminarModulo(moduloId, token);
          // Refresh the modulo list after deletion
          this.loadModulos();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Módulo Eliminado Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(moduloId: string) {
    this.router.navigate(['/editar-modulo', moduloId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
