import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('🔐 AuthStateService constructor -', isPlatformBrowser(this.platformId) ? 'Browser environment' : 'Server environment');
    
    if (isPlatformBrowser(this.platformId)) {
      // Initialize authentication state on service creation
      this.checkAuthState();
    }
  }

  checkAuthState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const isAuthenticated = !!token;
      console.log('🔐 checkAuthState - Token present:', !!token, 'Setting authenticated to:', isAuthenticated);
      console.log('🔐 checkAuthState - Token value:', token);
      console.log('🔐 checkAuthState - Token length:', token?.length);
      this.isAuthenticatedSubject.next(isAuthenticated);
    } else {
      console.log('🔐 checkAuthState - Server environment, setting authenticated to false');
      this.isAuthenticatedSubject.next(false);
    }
  }

  setAuthenticated(authenticated: boolean): void {
    console.log('🔐 setAuthenticated called with:', authenticated);
    this.isAuthenticatedSubject.next(authenticated);
  }

  login(token: string): void {
    console.log('🔐 AuthStateService.login() called with token:', token ? 'Present' : 'Missing');
    console.log('🔐 Token value:', token);
    console.log('🔐 Token length:', token?.length);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      console.log('🔐 Token stored in localStorage');
      
      // Verify token was stored
      const storedToken = localStorage.getItem('token');
      console.log('🔐 Verification - Stored token:', storedToken ? 'Present' : 'Missing');
      console.log('🔐 Verification - Stored token value:', storedToken);
      console.log('🔐 Verification - Stored token length:', storedToken?.length);
    }
    this.setAuthenticated(true);
    console.log('🔐 Authentication state set to true');
  }

  logout(): void {
    console.log('🔐 AuthStateService.logout() called');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      console.log('🔐 Token removed from localStorage');
    }
    this.setAuthenticated(false);
    console.log('🔐 Authentication state set to false');
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const isLoggedIn = !!token;
      console.log('🔐 AuthStateService.isLoggedIn() called - Browser environment');
      console.log('🔐 Token from localStorage:', token ? 'Present' : 'Missing');
      console.log('🔐 Token value:', token);
      console.log('🔐 Token length:', token?.length);
      console.log('🔐 isLoggedIn result:', isLoggedIn);
      return isLoggedIn;
    }
    // During SSR, we can't access localStorage, so we'll return false
    // This is expected behavior for SSR
    console.log('🔐 AuthStateService.isLoggedIn() called - Server environment, returning false');
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Method to manually refresh auth state (useful for debugging)
  refreshAuthState(): void {
    console.log('🔐 refreshAuthState() called');
    this.checkAuthState();
  }
} 