import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async registrarAsistencia(programacionHorarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/asistencia/registrar/${programacionHorarioId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, null, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAsistenciaDeHoy(programacionHorarioId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/${programacionHorarioId}/horario`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      console.log("hola");
      console.log(response.message);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }

  async listarAsistencias(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/asistencia/listar`;
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



  // async registrarAsistencia(programacionHorarioId: string, token: string): Promise<any> {
  //   const url = `${this.BASE_URL}/adminuser/asistencia/registrar/${programacionHorarioId}`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   console.log(headers);
  //   try {
  //     const response = await this.http.post<any>(url, { headers }).toPromise();
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}
