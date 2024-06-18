import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionHorariosService {

  private BASE_URL = "http://68.183.122.161:8080";

  constructor(private http: HttpClient) { }

  async guardarProgramacionHorario(programacionId: string, programacionHorarioData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacionhr/guardar/${programacionId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, programacionHorarioData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarProgramacionHorario(programacionHorarioId: string, programacionHorarioData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacionhr/actualizar/${programacionHorarioId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, programacionHorarioData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarProgramacionHorario(programacionHorarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacionhr/eliminar/${programacionHorarioId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async listarProgramacionesHorario(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacionhr/listar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramacionHorarioById(programacionHorarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacionhr/${programacionHorarioId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

