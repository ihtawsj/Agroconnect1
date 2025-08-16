import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // ✅
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterLink] // ✅ Add RouterLink here
})
export class RegisterComponent implements OnInit {
  user = { name: '', email: '', password: '', role: 'BUYER' }; // set default role
  message = '';
  error = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // If user is already logged in, redirect to dashboard
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.message = '';
    this.error = '';
    
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.message = 'Registration successful! Redirecting to login...';
        // Redirect to login after successful registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }
}
