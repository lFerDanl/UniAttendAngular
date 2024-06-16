import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  generarReporteAsistenciasPDF(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/reportes/asistencias/pdf`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers, responseType: 'blob' as 'json' }).toPromise();
  }

  generarReporteProgramacionesPDF(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/reportes/programaciones/pdf`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers, responseType: 'blob' as 'json' }).toPromise();
  }

  generarReporteAsistenciasExcel(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/reportes/asistencias/excel`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers, responseType: 'blob' as 'json' }).toPromise();
  }

  generarReporteProgramacionesExcel(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/reportes/programaciones/excel`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers, responseType: 'blob' as 'json' }).toPromise();
  }

}