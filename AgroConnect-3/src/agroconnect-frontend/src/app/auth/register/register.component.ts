import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegistrationRequest } from '../../models/user.model';

@Component({
  selector: 'app-register', // ✅ should be correct and not clash with login
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: RegistrationRequest = {
    name: '',
    email: '',
    password: '',
    role: 'BUYER' // Default value
  };

  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Clear previous messages
    this.message = '';
    this.error = '';

    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.message || 'Registration failed.';
        console.error(err);
      }
    });
  }
}
