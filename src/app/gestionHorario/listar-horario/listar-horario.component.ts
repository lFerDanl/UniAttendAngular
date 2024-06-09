import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HorariosService } from '../../services/gestionHorarios/horarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-horario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-horario.component.html',
  styleUrl: './listar-horario.component.css'
})
export class ListarHorarioComponent {
  horarios: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly horarioService: HorariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadHorarios();
  }

  async loadHorarios() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.horarioService.listarHorarios(token);
      if (response && response.statusCode === 200 && response.horarioList) {
        this.horarios = response.horarioList;
      } else {
        this.showError('No horarios found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteHorario(horarioId: string) {
    Swal.fire({
      title: "Estas Seguro?",
      text: "No podrás deshacer los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token: any = localStorage.getItem('token');
          await this.horarioService.eliminarHorario(horarioId, token);
          // Refresh the horario list after deletion
          this.loadHorarios();

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Horario Eliminado Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error: any) {
          this.showError(error.message);
        }
      }
    });
  }

  navigateToUpdate(horarioId: string) {
    this.router.navigate(['/editar-horario', horarioId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
