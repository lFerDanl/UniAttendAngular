import { Component } from '@angular/core';
import { ReportesService } from '../../services/gestionReportes/reportes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  tipoReporte: string = 'asistencias'; // Valor por defecto

  constructor(private reporteService: ReportesService) {}

  async generarReporte() {
    try {
      let token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

      if (!token) {
        console.error('No se ha encontrado un token en el almacenamiento local.');
        return;
      }

      if (this.tipoReporte === 'asistencias') {
        // Generar reporte de asistencias
        const response = await this.reporteService.generarReporteAsistenciasPDF(token);
        this.descargarReporte(response);
      } else if (this.tipoReporte === 'programaciones') {
        // Generar reporte de programaciones
        const response = await this.reporteService.generarReporteProgramacionesPDF(token);
        this.descargarReporte(response);
      } else {
        console.error('Tipo de reporte no válido.');
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  }

  descargarReporte(response: any) {
    const blob = new Blob([response], { type: 'application/pdf' }); // Cambiar tipo si es necesario
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Abre el archivo en una nueva pestaña
  }
}
