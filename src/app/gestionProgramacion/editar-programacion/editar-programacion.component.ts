import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CarrerasService } from '../../services/gestionCarrera/carreras.service';
import { MateriasService } from '../../services/gestionMateria/materias.service';
import { GruposService } from '../../services/gestionGrupo/grupos.service';
import { UsersService } from '../../services/gestionUsuarios/users.service';
import { ProgramacionesService } from '../../services/gestionProgramacion/programaciones.service';

@Component({
  selector: 'app-editar-programacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-programacion.component.html',
  styleUrl: './editar-programacion.component.css'
})
export class EditarProgramacionComponent implements OnInit{
  programacionId: any;
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
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.getProgramacionById();
    await this.loadCarreras();
    await this.loadMaterias();
    await this.loadGrupos();
    await this.loadUsuarios();
  }

  async getProgramacionById() {
    this.programacionId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.programacionId || !token) {
      this.showError("Programacion ID or Token is required");
      return;
    }

    try {
      const programacionResponse = await this.programacionesService.getProgramacionById(this.programacionId, token);
      console.log(programacionResponse.programacion);
      const { cupos, materia, grupo, usuario, carrerasId} = programacionResponse.programacion;
      this.formData = { cupos, materia, grupo, usuario, carrerasId };
    } catch (error: any) {
      this.showError(error.message);
    }
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

  async updateProgramacion() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta programación?',
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
      const token: any = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const res = await this.programacionesService.actualizarProgramacion(this.programacionId, this.formData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Programación Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/programaciones']);
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
