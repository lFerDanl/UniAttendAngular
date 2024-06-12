import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MateriasService } from '../../services/gestionMateria/materias.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-materia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-materia.component.html',
  styleUrl: './editar-materia.component.css'
})
export class EditarMateriaComponent {
  materiaId: any;
  materiaData: any = {
    nombre: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly materiaService: MateriasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMateriaById();
  }

  async getMateriaById() {
    this.materiaId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.materiaId || !token) {
      this.showError("ID de Materia o Token requerido");
      return;
    }

    try {
      const materiaResponse = await this.materiaService.getMateriaById(this.materiaId, token);
      const { nombre } = materiaResponse.materia;
      this.materiaData = { nombre };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateMateria() {
    const confirmUpdate = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta materia?',
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
      const res = await this.materiaService.actualizarMateria(this.materiaId, this.materiaData, token);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Materia Actualizada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/materias']);
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
      this.errorMessage = ''
    }, 3000)
  }
}
