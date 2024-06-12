import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultadesService } from '../../services/gestionFacultad/facultades.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-facultad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-facultad.component.html',
  styleUrl: './editar-facultad.component.css'
})
export class EditarFacultadComponent {
  facultadId: any;
  facultadData: any = {
    nombre: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly facultadService: FacultadesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFacultadById();
  }

  async getFacultadById() {
    this.facultadId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.facultadId || !token) {
      this.showError("ID de Facultad o Token requeridos");
      return;
    }

    try {
      const facultadResponse = await this.facultadService.getFacultadById(this.facultadId, token);
      const { nombre } = facultadResponse.facultad;
      this.facultadData = { nombre };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateFacultad() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta facultad?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Actualizar!'
    });

    if (!confirmUpdate.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const res = await this.facultadService.actualizarFacultad(this.facultadId, this.facultadData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Facultad Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/facultades']);
      } else {
        this.showError(res.message);
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
