import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aleatorio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aleatorio.component.html',
  styleUrl: './aleatorio.component.css'
})
export class AleatorioComponent {
  constructor() { }

  confirmarEliminar(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí podrías agregar la lógica para eliminar el registro con el ID correspondiente
        Swal.fire(
          "¡Eliminado!",
          "Tu archivo ha sido eliminado.",
          "success"
        );
      }
    });
  }
}
