import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModulosService } from '../../services/gestionModulo/modulos.service';
import { AulasService } from '../../services/gestionAulas/aulas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modulo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-modulo.component.html',
  styleUrl: './crear-modulo.component.css'
})
export class CrearModuloComponent {
  formData: any = {
    nro: '',
    aulasId: []
  };
  errorMessage: string = '';
  aulasDisponibles: any[] = [];

  constructor(
    private readonly moduloService: ModulosService,
    private readonly aulasService: AulasService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadAulas();
  }

  async loadAulas() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.aulasService.listarAulas(token);
      if (response && response.statusCode === 200 && response.aulaList) {
        this.aulasDisponibles = response.aulaList;
      } else {
        this.showError('No se encontraron aulas disponibles.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  isAulaSelected(aulaId: string): boolean {
    return this.formData.aulasId.includes(aulaId);
  }

  toggleAulaSelection(aulaId: string): void {
    const index = this.formData.aulasId.indexOf(aulaId);
    if (index !== -1) {
      // Si el aula ya está seleccionada, eliminarla del arreglo
      this.formData.aulasId.splice(index, 1);
    } else {
      // Si el aula no está seleccionada, agregarla al arreglo
      this.formData.aulasId.push(aulaId);
    }
  }
  
  async handleSubmit() {
    if (!this.formData.nro || this.formData.aulasId.length === 0) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    const confirmCreation = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Quieres crear este módulo?',
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

      const response = await this.moduloService.guardarModulo(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Módulo Creado Exitosamente!',
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
