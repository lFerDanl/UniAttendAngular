import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GruposService } from '../../services/gestionGrupo/grupos.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-grupo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-grupo.component.html',
  styleUrl: './editar-grupo.component.css'
})
export class EditarGrupoComponent {
  grupoId: any;
  grupoData: any = {
    nombre: '',
  };
  errorMessage: string = '';

  constructor(
    private readonly grupoService: GruposService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getGrupoById();
  }

  async getGrupoById() {
    this.grupoId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.grupoId || !token) {
      this.showError("Grupo ID o Token no encontrado");
      return;
    }

    try {
      const grupoResponse = await this.grupoService.getGrupoById(this.grupoId, token);
      const { nombre } = grupoResponse.grupo;
      this.grupoData = { nombre };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateGrupo() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este grupo?',
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
      const res = await this.grupoService.actualizarGrupo(this.grupoId, this.grupoData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Grupo actualizado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/grupos']);
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
