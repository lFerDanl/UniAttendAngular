import { Component } from '@angular/core';
import { LicenciasService } from '../../services/gestionLicencias/licencias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-licencia',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-licencia.component.html',
  styleUrl: './crear-licencia.component.css'
})
export class CrearLicenciaComponent {
  formData: any = {
    tipo: '',
    fechaInicio: '',
    fechaFin: '',
  };
  errorMessage: string = '';

  constructor(
    private readonly licenciaService: LicenciasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async handleSubmit() {
    // Validación básica de campos
    if (!this.formData.tipo || !this.formData.fechaInicio || !this.formData.fechaFin) {
      this.showError('Por favor rellena todos los campos.');
      return;
    }

    // Confirmación con el usuario
    const confirmCreation = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear esta licencia?',
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

      // Llamar al servicio para guardar la licencia
      const response = await this.licenciaService.guardarLicencia(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Licencia Creada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/licencias/usuario']);
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
      this.errorMessage = ''; // Limpiar el mensaje de error después de cierto tiempo
    }, 3000);
  }
}
