import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private BASE_URL = "http://68.183.122.161:8080";

  constructor(private http: HttpClient) { }

  async guardarAula(aulaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/aula/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, aulaData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarAula(aulaId: string, aulaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/aula/actualizar/${aulaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, aulaData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarAula(aulaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/aula/eliminar/${aulaId}`;
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

  async listarAulas(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/aula/listar`;
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

  async getAulaById(aulaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/aula/${aulaId}`;
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
