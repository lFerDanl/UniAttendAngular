import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionesService {

  private BASE_URL = "http://68.183.122.161:8080";

  constructor(private http: HttpClient) { }

  async guardarProgramacion(programacionData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, programacionData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarProgramacion(programacionId: string, programacionData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/actualizar/${programacionId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, programacionData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarProgramacion(programacionId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/eliminar/${programacionId}`;
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

  async listarProgramaciones(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/listar`;
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

  async listarProgramacionesPorUsuarioActual(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/listar/usuario`;
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

  async listarProgramacionesPorUsuario(usuarioId: string,token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/listar/usuario/${usuarioId}`;
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

  async getProgramacionById(programacionId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/programacion/${programacionId}`;
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

  async getProgramacionHorarios(programacionId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/${programacionId}/horarios`;
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

  async getProgramacionCarreras(programacionId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/${programacionId}/carreras`;
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

  async listarClasesDeHoy(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/clasesDeHoy`;
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
