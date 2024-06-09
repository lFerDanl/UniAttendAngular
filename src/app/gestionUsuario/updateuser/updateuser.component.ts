import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent implements OnInit{
  constructor(private readonly userService:UsersService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}


    userId: any;
    userData: any = {}
    errorMessage:string = ''


  ngOnInit(): void {
    this.getUserById()
      
  }

  async getUserById(){
      this.userId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.userId || !token){
          this.showError("User ID or TOken is Required")
          return;
      }

      try {
        let userDataResponse = await this.userService.getUsersById(this.userId, token)
        const {name, email, role, city, direccion, telefono, ci} = userDataResponse.ourUsers
        this.userData = {name, email, role, city, direccion, telefono, ci};
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateUser(){
    const confirmUpdate = await Swal.fire({
      title: 'Estas seguro?',
      text: 'Quieres actualizar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar!'
    });
  
    if (!confirmUpdate.isConfirmed) {
      return;
    }
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token no encontrado")
      }
      const res = await this.userService.updateUSer(this.userId, this.userData, token);
      console.log(res)

      if(res.statusCode === 200){
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/users'])
      }else{
        this.showError(res.message)
      }

    }catch(error:any){
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
