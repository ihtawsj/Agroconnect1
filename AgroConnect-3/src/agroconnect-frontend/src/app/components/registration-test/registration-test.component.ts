import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationValidator, ValidationResult } from '../../utils/registration-validator';

@Component({
  selector: 'app-registration-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Registration Format Validation Test</h3>
      
      <div class="card mb-3">
        <div class="card-header">
          <h5>Test Case 1: Valid Format (Your Example)</h5>
        </div>
        <div class="card-body">
          <pre>{{ validExample | json }}</pre>
          <div class="mt-2">
            <strong>Validation Result:</strong>
            <span class="badge" [class]="validResult.isValid ? 'bg-success' : 'bg-danger'">
              {{ validResult.isValid ? 'VALID' : 'INVALID' }}
            </span>
          </div>
          <div *ngIf="!validResult.isValid" class="mt-2">
            <strong>Errors:</strong>
            <ul class="text-danger">
              <li *ngFor="let error of validResult.errors">{{ error }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header">
          <h5>Test Case 2: Invalid Format (Missing Fields)</h5>
        </div>
        <div class="card-body">
          <pre>{{ invalidExample | json }}</pre>
          <div class="mt-2">
            <strong>Validation Result:</strong>
            <span class="badge" [class]="invalidResult.isValid ? 'bg-success' : 'bg-danger'">
              {{ invalidResult.isValid ? 'VALID' : 'INVALID' }}
            </span>
          </div>
          <div *ngIf="!invalidResult.isValid" class="mt-2">
            <strong>Errors:</strong>
            <ul class="text-danger">
              <li *ngFor="let error of invalidResult.errors">{{ error }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header">
          <h5>Test Case 3: Invalid Role</h5>
        </div>
        <div class="card-body">
          <pre>{{ invalidRoleExample | json }}</pre>
          <div class="mt-2">
            <strong>Validation Result:</strong>
            <span class="badge" [class]="invalidRoleResult.isValid ? 'bg-success' : 'bg-danger'">
              {{ invalidRoleResult.isValid ? 'VALID' : 'INVALID' }}
            </span>
          </div>
          <div *ngIf="!invalidRoleResult.isValid" class="mt-2">
            <strong>Errors:</strong>
            <ul class="text-danger">
              <li *ngFor="let error of invalidRoleResult.errors">{{ error }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
    }
  `]
})
export class RegistrationTestComponent {
  validExample = {
    name: "swathi",
    email: "swathi@example.com",
    password: "123456",
    role: "BUYER"
  };

  invalidExample = {
    name: "swathi",
    email: "swathi@example.com"
    // Missing password and role
  };

  invalidRoleExample = {
    name: "swathi",
    email: "swathi@example.com",
    password: "123456",
    role: "ADMIN" // Invalid role
  };

  validResult: ValidationResult;
  invalidResult: ValidationResult;
  invalidRoleResult: ValidationResult;

  constructor() {
    this.validResult = RegistrationValidator.validateFormat(this.validExample);
    this.invalidResult = RegistrationValidator.validateFormat(this.invalidExample);
    this.invalidRoleResult = RegistrationValidator.validateFormat(this.invalidRoleExample);
  }
} 