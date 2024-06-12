import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async guardarCarrera(carreraData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/carrera/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, carreraData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarCarrera(carreraId: string, carreraData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/carrera/actualizar/${carreraId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, carreraData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarCarrera(carreraId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/carrera/eliminar/${carreraId}`;
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

  async listarCarreras(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/carrera/listar`;
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

  async getCarreraById(carreraId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/carrera/${carreraId}`;
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
