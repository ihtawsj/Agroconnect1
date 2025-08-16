import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private apiUrl = 'http://localhost:8080/farmer';

  constructor(private http: HttpClient) { }

  // Helper to add the JWT token to headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getFarmerOrders(filters: {
    produceName?: string;
    buyerName?: string;
    fromDate?: string;
    toDate?: string;
  }): Observable<any[]> {
    const params: any = {};

    if (filters.produceName) params.produceName = filters.produceName;
    if (filters.buyerName) params.buyerName = filters.buyerName;
    if (filters.fromDate) params.fromDate = filters.fromDate;
    if (filters.toDate) params.toDate = filters.toDate;

    return this.http.get<any[]>(
      `${this.apiUrl}/orders`,
      { params, ...this.getAuthHeaders() }
    );
  }

  deleteProduce(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produce/${id}`, this.getAuthHeaders());
  }

  getMyProduce(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produce/my-produce`, this.getAuthHeaders());
  }
}
