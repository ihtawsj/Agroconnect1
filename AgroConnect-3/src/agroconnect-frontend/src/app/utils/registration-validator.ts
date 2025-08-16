import { RegistrationRequest } from '../models/user.model';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class RegistrationValidator {
  static validateFormat(data: any): ValidationResult {
    const errors: string[] = [];

    // Check if data is an object
    if (!data || typeof data !== 'object') {
      errors.push('Registration data must be an object');
      return { isValid: false, errors };
    }

    // Check required fields
    const requiredFields = ['name', 'email', 'password', 'role'];
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`${field} is required`);
      }
    }

    // Validate email format
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Invalid email format');
    }

    // Validate password length
    if (data.password && data.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    // Validate role
    if (data.role && !['BUYER', 'FARMER'].includes(data.role)) {
      errors.push('Role must be either BUYER or FARMER');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static formatMatchesExpected(data: any): boolean {
    const expectedFields = ['name', 'email', 'password', 'role'];

    // Check if all expected fields are present
    const hasAllFields = expectedFields.every(key => key in data);
    
    // Check if role is valid
    const hasValidRole = data.role === 'BUYER' || data.role === 'FARMER';
    
    return hasAllFields && hasValidRole;
  }
} 