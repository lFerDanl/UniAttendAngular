import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService } from '../../services/gestionCarrera/carreras.service';
import { FacultadesService } from '../../services/gestionFacultad/facultades.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-carrera',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-carrera.component.html',
  styleUrl: './crear-carrera.component.css'
})
export class CrearCarreraComponent {
  formData: any = {
    nombre: '',
    facultad: null // Inicialmente no se selecciona ninguna facultad
  };
  errorMessage: string = '';
  facultades: any[] = [];

  constructor(
    private readonly carreraService: CarrerasService,
    private readonly facultadService: FacultadesService,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    await this.loadFacultades();
  }
  
  async loadFacultades() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.facultadService.listarFacultades(token);
      if (response && response.statusCode === 200 && response.facultadList) {
        this.facultades = response.facultadList;
      } else {
        this.showError('No se encontraron facultades.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.carreraService.guardarCarrera(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Carrera Creada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/carreras']);
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
