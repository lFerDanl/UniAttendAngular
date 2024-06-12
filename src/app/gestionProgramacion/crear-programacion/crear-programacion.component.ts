import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramacionesService } from '../../services/gestionProgramacion/programaciones.service';
import { CarrerasService } from '../../services/gestionCarrera/carreras.service';
import { MateriasService } from '../../services/gestionMateria/materias.service';
import { GruposService } from '../../services/gestionGrupo/grupos.service';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-programacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-programacion.component.html',
  styleUrl: './crear-programacion.component.css'
})
export class CrearProgramacionComponent {
  formData: any = {
    cupos: '',
    carrerasId: [],
    materia: null,
    grupo: null,
    usuario: null
  };
  errorMessage: string = '';
  carreras: any[] = [];
  materias: any[] = [];
  grupos: any[] = [];
  usuarios: any[] = [];

  constructor(
    private readonly programacionesService: ProgramacionesService,
    private readonly carrerasService: CarrerasService,
    private readonly materiasService: MateriasService,
    private readonly gruposService: GruposService,
    private readonly usuariosService: UsersService,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    await this.loadCarreras();
    await this.loadMaterias();
    await this.loadGrupos();
    await this.loadUsuarios();
  }

  async loadCarreras() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.carrerasService.listarCarreras(token);
      if (response && response.statusCode === 200 && response.carreraList) {
        this.carreras = response.carreraList;
      } else {
        this.showError('No se encontraron carreras.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  isCarreraSelected(carreraId: string): boolean {
      return this.formData.carrerasId.includes(carreraId);
  }

  toggleCarreraSelection(carreraId: string): void {
      const index = this.formData.carrerasId.indexOf(carreraId);
      if (index !== -1) {
          // Si la carrera ya está seleccionada, eliminarla del arreglo
          this.formData.carrerasId.splice(index, 1);
      } else {
          // Si la carrera no está seleccionada, agregarla al arreglo
          this.formData.carrerasId.push(carreraId);
      }
  }

  async loadMaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.materiasService.listarMaterias(token);
      if (response && response.statusCode === 200 && response.materiaList) {
        this.materias = response.materiaList;
      } else {
        this.showError('No se encontraron materias.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadGrupos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.gruposService.listarGrupos(token);
      if (response && response.statusCode === 200 && response.grupoList) {
        this.grupos = response.grupoList;
      } else {
        this.showError('No se encontraron grupos.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadUsuarios() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.usuariosService.getAllUsers(token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.usuarios = response.ourUsersList;
      } else {
        this.showError('No se encontraron usuarios.');
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

      const response = await this.programacionesService.guardarProgramacion(this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Programación Académica Creada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/crear-programacion-horario', response.programacionAcademicaId])
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

