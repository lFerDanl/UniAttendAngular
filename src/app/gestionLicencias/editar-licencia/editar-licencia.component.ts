import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LicenciasService } from '../../services/gestionLicencias/licencias.service';

@Component({
  selector: 'app-editar-licencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-licencia.component.html',
  styleUrl: './editar-licencia.component.css'
})
export class EditarLicenciaComponent implements OnInit {
  licenciaId: any;
  licenciaData: any = {
    tipo: '',
    fechaInicio: '',
    fechaFin: '',
    estado: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly licenciasService: LicenciasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLicenciaById();
  }

  async getLicenciaById() {
    this.licenciaId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.licenciaId || !token) {
      this.showError("Licencia ID or Token is required");
      return;
    }

    try {
      const licenciaResponse = await this.licenciasService.getLicenciaById(this.licenciaId, token);
      const { tipo, fechaInicio, fechaFin, estado } = licenciaResponse.licencia;
      this.licenciaData = { tipo, fechaInicio, fechaFin, estado };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateLicencia() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta licencia?',
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
      const res = await this.licenciasService.actualizarLicencia(this.licenciaId, this.licenciaData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Licencia Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/licencias/usuario']);
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
