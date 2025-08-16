import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, RegistrationRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: RegistrationRequest): Observable<any> {
    // Validate registration format
    const validationError = this.validateRegistrationFormat(user);
    if (validationError) {
      return throwError(() => new Error(validationError));
    }
    
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  private validateRegistrationFormat(user: RegistrationRequest): string | null {
    // Check if all required fields are present
    if (!user.name || !user.email || !user.password || !user.role) {
      return 'All fields are required';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return 'Invalid email format';
    }

    // Validate password length (minimum 6 characters)
    if (user.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    // Validate role
    if (user.role !== 'BUYER' && user.role !== 'FARMER') {
      return 'Role must be either BUYER or FARMER';
    }

    return null;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
