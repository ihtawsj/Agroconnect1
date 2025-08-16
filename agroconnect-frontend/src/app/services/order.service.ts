import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getOrderHistory(): Observable<any> {
    const url = `${this.apiUrl}/buyer/orders`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  placeOrder(): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart/place-order`;
    const headers = this.getHeaders();
    return this.http.post(url, {}, { headers, responseType: 'text' });
  }
}
