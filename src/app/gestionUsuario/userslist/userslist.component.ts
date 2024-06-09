import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements OnInit{

  users: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadUsers();

  }

  async loadUsers() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllUsers(token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteUser(userId: string) {
    Swal.fire({
      title: "Estas Seguro?",
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
          await this.userService.deleteUser(userId, token);
          // Refresh the user list after deletion
          this.loadUsers();
  
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Usuario Eliminado Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  } 

  navigateToUpdate(userId: string) {
    this.router.navigate(['/update', userId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
