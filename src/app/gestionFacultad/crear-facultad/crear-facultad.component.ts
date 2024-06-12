import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultadesService } from '../../services/gestionFacultad/facultades.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-facultad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-facultad.component.html',
  styleUrl: './crear-facultad.component.css'
})
export class CrearFacultadComponent {
  formData: any = {
    nombre: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly facultadService: FacultadesService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Verificar que todos los campos no estén vacíos
    if (!this.formData.nombre) {
      this.showError('Por favor, ingresa el nombre de la facultad.');
      return;
    }

    // Confirmar la creación con el usuario
    const confirmCreation = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear esta facultad?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear!'
    });
    if (!confirmCreation.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.facultadService.guardarFacultad(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Facultad Creada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/facultades']);
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
      this.errorMessage = '';
    }, 3000);
  }
}
