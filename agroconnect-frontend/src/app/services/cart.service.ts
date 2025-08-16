import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080'; // update if needed

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  addToCart(produceId: number, quantity: number): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart/add?produceId=${produceId}&quantity=${quantity}`;
    const headers = this.getHeaders();
    
    console.log('🛒 Cart Service - URL being sent:', url);
    console.log('🛒 Cart Service - produceId:', produceId, 'quantity:', quantity);
    console.log('🛒 Cart Service - Headers:', headers);
    
    return this.http.post(url, {}, { headers, responseType: 'text' });
  }

  getCartItems(): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart/${cartItemId}`;
    const headers = this.getHeaders();
    return this.http.put(url, { quantity }, { headers, responseType: 'text' });
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart/${cartItemId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  clearCart(): Observable<any> {
    const url = `${this.apiUrl}/buyer/cart`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers, responseType: 'text' });
  }
} 