import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  @Output() loggedIn: EventEmitter<void> = new EventEmitter<void>();

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Email y Contraseña es requerida");
      return
    }

    try {
      const response = await this.usersService.login(this.email, this.password);
      if(response.statusCode == 200){
        this.loggedIn.emit();
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Has iniciado sesión exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        this.showError(response.message)
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
