import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModulosService } from '../../services/gestionModulo/modulos.service';
import { AulasService } from '../../services/gestionAulas/aulas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-modulo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-modulo.component.html',
  styleUrl: './editar-modulo.component.css'
})
export class EditarModuloComponent {
  moduloId: any;
  moduloData: any = {
    nro: '',
    aulas: []
  };
  errorMessage: string = '';
  aulasDisponibles: any[] = [];

  constructor(
    private readonly moduloService: ModulosService,
    private readonly aulasService: AulasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.moduloId = this.route.snapshot.paramMap.get('id');
    if (!this.moduloId) {
      this.showError('ID de módulo no encontrado');
      return;
    }
    this.getModuloById();
    this.loadAulas();
  }

  async getModuloById() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showError('Token no encontrado');
      return;
    }

    try {
      const moduloResponse = await this.moduloService.getModuloById(this.moduloId, token);
      this.moduloData = moduloResponse.modulo;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadAulas() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.aulasService.listarAulas(token); // Llama al método listarAulas del servicio AulasService
      if (response && response.statusCode === 200 && response.aulasDisponibles) {
        this.aulasDisponibles = response.aulasDisponibles;
      } else {
        this.showError('No se encontraron aulas disponibles.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateModulo() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Quieres actualizar este módulo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar!'
    });

    if (!confirmUpdate.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await this.moduloService.actualizarModulo(this.moduloId, this.moduloData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Módulo Actualizado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/modulos']);
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
