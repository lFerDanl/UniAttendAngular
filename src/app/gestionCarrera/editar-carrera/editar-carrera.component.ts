import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService } from '../../services/gestionCarrera/carreras.service';
import { FacultadesService } from '../../services/gestionFacultad/facultades.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-carrera',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-carrera.component.html',
  styleUrl: './editar-carrera.component.css'
})
export class EditarCarreraComponent {
  carreraId: any;
  formData: any = {
    nombre: '',
    facultad: null
  };
  errorMessage: string = '';
  facultades: any[] = [];

  constructor(
    private readonly carreraService: CarrerasService,
    private readonly facultadService: FacultadesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.loadFacultades();
    this.getCarreraById();
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

  async getCarreraById() {
    this.carreraId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.carreraId || !token) {
      this.showError("Carrera ID o Token es requerido");
      return;
    }

    try {
      const carreraResponse = await this.carreraService.getCarreraById(this.carreraId, token);
      const { nombre, facultad } = carreraResponse.carrera;
      this.formData = { nombre, facultad };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateCarrera() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta carrera?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar'
    });

    if (!confirmUpdate.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const res = await this.carreraService.actualizarCarrera(this.carreraId, this.formData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Carrera Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/carreras']);
      } else {
        this.showError(res.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
