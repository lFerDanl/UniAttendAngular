import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async guardarGrupo(grupoData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/grupo/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, grupoData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarGrupo(grupoId: string, grupoData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/grupo/actualizar/${grupoId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, grupoData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarGrupo(grupoId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/grupo/eliminar/${grupoId}`;
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

  async listarGrupos(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/grupo/listar`;
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

  async getGrupoById(grupoId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/grupo/${grupoId}`;
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
