import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStateService } from './services/auth-state.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'agroconnect-frontend';
  isAuthenticated = false;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Initialize authentication state on app startup
    if (isPlatformBrowser(this.platformId)) {
      this.authStateService.checkAuthState();
    }

    // Subscribe to authentication state changes
    this.authStateService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    // Check if user is on a protected route but not logged in
    // Only do this check after a small delay to avoid interfering with login redirects
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const currentRoute = this.router.url;
        const protectedRoutes = ['/dashboard', '/produce', '/cart', '/orders', '/farmer'];
        
        if (protectedRoutes.some(route => currentRoute.startsWith(route)) && !this.isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }, 1000);
    }
  }

  getUserRole(): string {
    const token = this.authStateService.getToken();
    
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const role = decoded.role || decoded.roles || decoded.authorities || decoded.userRole || decoded.role_name;
        
        // If it's an array, take the first element
        if (Array.isArray(role)) {
          return role[0];
        }
        
        // If it's a string like "ROLE_FARMER", extract the role part
        if (typeof role === 'string' && role.startsWith('ROLE_')) {
          return role.replace('ROLE_', '');
        }
        
        return role || 'Unknown';
      } catch (error) {
        return 'Error decoding token';
      }
    }
    return 'No token';
  }

  logout(): void {
    this.authStateService.logout();
    this.router.navigate(['/login']);
  }
}
