import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../services/auth-state.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  
  loading = false;
  errorMessage = '';
  successMessage = '';
  error = '';

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.redirectBasedOnRole(token);
      }
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.token) {
          this.authStateService.login(response.token);
          this.successMessage = '✅ Login successful! Redirecting...';
          
          // Redirect based on role
          setTimeout(() => {
            this.redirectBasedOnRole(response.token);
          }, 1000);
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || '❌ Login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  private redirectBasedOnRole(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role;

      if (role === 'FARMER') {
        this.router.navigate(['/farmer']);
      } else if (role === 'BUYER') {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Unknown role. Cannot redirect.';
      }
    } catch (error) {
      this.errorMessage = 'Error decoding token.';
    }
  }
}
