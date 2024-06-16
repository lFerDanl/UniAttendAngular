import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {

  private BASE_URL = 'http://localhost:8080'; // URL base de tu API

  constructor(private http: HttpClient) { }

  async guardarLicencia(registroLicencia: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/licencia/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    try {
      const response = await this.http.post<any>(url, registroLicencia, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarLicencia(licenciaId: string, registroLicencia: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/licencia/actualizar/${licenciaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, registroLicencia, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarLicencia(licenciaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/licencia/eliminar/${licenciaId}`;
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

  async listarLicencias(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/licencia/listar`;
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

  async getLicenciaById(licenciaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/licencia/${licenciaId}`;
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

  async listarLicenciasPorUsuarioId(usuarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/licencia/listar/${usuarioId}`;
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

  async listarLicenciasDelUsuarioActual(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/licencia/listar/usuario`;
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

  async aprobarLicencia(licenciaId: string, estadoData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/licencia/aprobar/${licenciaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, estadoData , { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

}