import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AulasService } from '../../services/gestionAulas/aulas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-aula',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-aula.component.html',
  styleUrl: './crear-aula.component.css'
})
export class CrearAulaComponent {
  formData: any = {
    nro: '',
    capacidad: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly aulasService: AulasService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Verificar si todos los campos están completos
    if (!this.formData.nro || !this.formData.capacidad) {
      this.showError('Por favor rellena todos los campos.');
      return;
    }

    // Confirmar la creación con el usuario
    const confirmCreation = await Swal.fire({
      title: 'Estas Seguro?',
      text: 'Quieres crear esta aula?',
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

      const response = await this.aulasService.guardarAula(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Aula Creada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/aulas']);
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
