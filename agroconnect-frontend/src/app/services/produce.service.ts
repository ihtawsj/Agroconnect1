import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProduceService {
  private apiUrl = 'http://localhost:8080/buyer/produce';

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authStateService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllProduce(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }
}
