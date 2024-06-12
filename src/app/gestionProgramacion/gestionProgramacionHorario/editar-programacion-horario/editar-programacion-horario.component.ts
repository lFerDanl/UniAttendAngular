import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramacionHorariosService } from '../../../services/gestionProgramacionHorario/programacion-horarios.service';
import { HorariosService } from '../../../services/gestionHorarios/horarios.service';
import { ModulosService } from '../../../services/gestionModulo/modulos.service';
import { AulasService } from '../../../services/gestionAulas/aulas.service';

@Component({
  selector: 'app-editar-programacion-horario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-programacion-horario.component.html',
  styleUrl: './editar-programacion-horario.component.css'
})
export class EditarProgramacionHorarioComponent {
  programacionHorarioId: any; 
  formData: any = {
    horario: null,
    modulo: null,
    aula: null,
  };
  errorMessage: string = '';
  horarios: any[] = [];
  modulos: any[] = [];
  aulas: any[] = [];

  constructor(
    private readonly programacionHorarioService: ProgramacionHorariosService,
    private readonly horariosService: HorariosService,
    private readonly modulosService: ModulosService,
    private readonly aulasService: AulasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.programacionHorarioId = this.route.snapshot.paramMap.get('id');
    await this.loadProgramacionHorario();
    await this.loadHorarios();
    await this.loadModulos();
    await this.loadAulas();
  }

  async loadProgramacionHorario() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.programacionHorarioService.getProgramacionHorarioById(this.programacionHorarioId, token);
      if (response && response.statusCode === 200 && response.programacionHorario) {
        const { horario, modulo, aula } = response.programacionHorario;
        this.formData = { horario, modulo, aula };
      } else {
        this.showError('No se encontró la programación horaria.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadHorarios() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.horariosService.listarHorarios(token);
      if (response && response.statusCode === 200 && response.horarioList) {
        this.horarios = response.horarioList;
      } else {
        this.showError('No se encontraron horarios.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadModulos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.modulosService.listarModulos(token);
      if (response && response.statusCode === 200 && response.moduloList) {
        this.modulos = response.moduloList;
      } else {
        this.showError('No se encontraron módulos.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadAulas() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.aulasService.listarAulas(token);
      if (response && response.statusCode === 200 && response.aulaList) {
        this.aulas = response.aulaList;
      } else {
        this.showError('No se encontraron aulas.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateProgramacionHorario() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      const response = await this.programacionHorarioService.actualizarProgramacionHorario(this.programacionHorarioId,this.formData, token);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Programación Horaria Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/programaciones']);
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
