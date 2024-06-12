import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async guardarMateria(materiaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/materia/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, materiaData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarMateria(materiaId: string, materiaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/materia/actualizar/${materiaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, materiaData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarMateria(materiaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/materia/eliminar/${materiaId}`;
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

  async listarMaterias(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/materia/listar`;
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

  async getMateriaById(materiaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/materia/${materiaId}`;
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
