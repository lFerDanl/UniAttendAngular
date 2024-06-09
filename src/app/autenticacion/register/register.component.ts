import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: '',
    city: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.role || !this.formData.city) {
      this.showError('Por favor rellena todos los campos.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = await Swal.fire({
      title: 'Estas Seguro?',
      text: 'Quieres registrar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!'
    });
    if (!confirmRegistration.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.userService.register(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/users']);
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
