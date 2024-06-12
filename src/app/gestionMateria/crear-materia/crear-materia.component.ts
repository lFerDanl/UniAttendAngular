import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MateriasService } from '../../services/gestionMateria/materias.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-materia.component.html',
  styleUrl: './crear-materia.component.css'
})
export class CrearMateriaComponent {
  formData: any = {
    nombre: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly materiaService: MateriasService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Verificar si todos los campos no están vacíos
    if (!this.formData.nombre) {
      this.showError('Por favor, ingresa el nombre de la materia.');
      return;
    }

    // Confirmar la creación con el usuario
    const confirmCreation = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear esta materia?',
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

      const response = await this.materiaService.guardarMateria(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Materia creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/materias']);
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
