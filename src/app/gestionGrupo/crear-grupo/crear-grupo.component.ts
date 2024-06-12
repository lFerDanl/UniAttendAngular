import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GruposService } from '../../services/gestionGrupo/grupos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  formData: any = {
    nombre: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly grupoService: GruposService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Verificar que todos los campos no estén vacíos
    if (!this.formData.nombre) {
      this.showError('Por favor, introduce un nombre para el grupo.');
      return;
    }

    // Confirmar la creación con el usuario
    const confirmCreation = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear este grupo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear'
    });
    if (!confirmCreation.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.grupoService.guardarGrupo(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Grupo creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/grupos']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Limpiar el mensaje de error después de la duración especificada
    }, 3000);
  }
}
