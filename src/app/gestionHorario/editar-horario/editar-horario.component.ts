import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorariosService } from '../../services/gestionHorarios/horarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-horario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.css'
})
export class EditarHorarioComponent {
  horarioId: any;
  horarioData: any = {
    dia: '',
    horarioInicio: '',
    horarioFin: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly horarioService: HorariosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHorarioById();
  }

  async getHorarioById() {
    this.horarioId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.horarioId || !token) {
      this.showError("Horario ID or Token is required");
      return;
    }

    try {
      const horarioResponse = await this.horarioService.getHorarioById(this.horarioId, token);
      const { dia, horarioInicio, horarioFin } = horarioResponse.horario;
      this.horarioData = { dia, horarioInicio, horarioFin };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateHorario() {
    const confirmUpdate = await Swal.fire({
      title: 'Estas seguro?',
      text: 'Quieres actualizar este horario?',
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
        throw new Error("Token no encontrado");
      }
      const res = await this.horarioService.actualizarHorario(this.horarioId, this.horarioData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Horario Actualizado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/horarios']);
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
