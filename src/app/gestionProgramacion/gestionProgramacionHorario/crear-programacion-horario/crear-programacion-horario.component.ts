import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramacionHorariosService } from '../../../services/gestionProgramacionHorario/programacion-horarios.service';
import { HorariosService } from '../../../services/gestionHorarios/horarios.service';
import { ModulosService } from '../../../services/gestionModulo/modulos.service';
import { AulasService } from '../../../services/gestionAulas/aulas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-programacion-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-programacion-horario.component.html',
  styleUrl: './crear-programacion-horario.component.css'
})
export class CrearProgramacionHorarioComponent {
  programacionAcademicaId: any; 
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
    await this.loadHorarios();
    await this.loadModulos();
    await this.loadAulas();
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

  async handleSubmit(event: Event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      this.programacionAcademicaId = this.route.snapshot.paramMap.get('id');

      const result = await Swal.fire({
        title: "¿Quieres añadir otro Horario?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "Añadir",
        cancelButtonText: "Cancelar"
      });

      if (result.isConfirmed) {
        const response = await this.programacionHorarioService.guardarProgramacionHorario(this.programacionAcademicaId, this.formData, token);
        if (response.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Horario añadido exitosamente!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/programaciones']);
          });
        } else {
          this.showError(response.message);
        }
      } else if (result.isDenied) {
        const response = await this.programacionHorarioService.guardarProgramacionHorario(this.programacionAcademicaId, this.formData, token);
        if (response.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Horario añadido exitosamente!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.resetFormData();
            this.router.navigate(['/crear-programacion-horario', this.programacionAcademicaId]).then(() => {
              this.loadHorarios();
              this.loadModulos();
              this.loadAulas();
            });
          });
        } else {
          this.showError(response.message);
        }
      } else {
        Swal.fire("Horario no guardado", "", "info");
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  resetFormData() {
    this.formData = {
      horario: null,
      modulo: null,
      aula: null,
    };
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
