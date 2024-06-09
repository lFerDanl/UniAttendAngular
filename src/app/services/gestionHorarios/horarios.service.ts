import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async guardarHorario(horarioData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/horario/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, horarioData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarHorario(horarioId: string, horarioData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/horario/actualizar/${horarioId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, horarioData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarHorario(horarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/horario/eliminar/${horarioId}`;
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

  async listarHorarios(token: string): Promise<any> {
    const url = `${this.BASE_URL}/horario/listar`;
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

  async getHorarioById(horarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/horario/${horarioId}`;
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
