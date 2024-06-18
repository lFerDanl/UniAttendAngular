import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  private BASE_URL = "http://68.183.122.161:8080";

  constructor(private http: HttpClient) { }

  async guardarModulo(moduloData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/guardar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, moduloData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async actualizarModulo(moduloId: string, moduloData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/actualizar/${moduloId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, moduloData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async eliminarModulo(moduloId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/eliminar/${moduloId}`;
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

  async listarModulos(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/listar`;
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

  async getModuloById(moduloId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/${moduloId}`;
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

  async getAulasByModuloId(moduloId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/modulo/aulas/${moduloId}`;
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


