export interface User {
  name: string;
  email: string;
  password: string;
  role: 'BUYER' | 'FARMER';
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  role: 'BUYER' | 'FARMER';
} 