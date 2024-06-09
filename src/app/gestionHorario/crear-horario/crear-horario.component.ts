import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorariosService } from '../../services/gestionHorarios/horarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-horario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-horario.component.html',
  styleUrl: './crear-horario.component.css'
})
export class CrearHorarioComponent {
  formData: any = {
    dia: '',
    horarioInicio: '',
    horarioFin: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly horarioService: HorariosService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Check if all fields are not empty
    if (!this.formData.dia || !this.formData.horarioInicio || !this.formData.horarioFin) {
      this.showError('Por favor rellena todos los campos.');
      return;
    }

    // Confirm creation with user
    const confirmCreation = await Swal.fire({
      title: 'Estas Seguro?',
      text: 'Quieres crear este horario?',
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

      const response = await this.horarioService.guardarHorario(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Horario Creado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/horarios']);
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
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
