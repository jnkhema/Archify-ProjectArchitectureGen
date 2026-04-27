import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/auth.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
name: string = '';
email: string = ''
password: string = '';
successMessage: string = '';
errorMessage: string = '';
isLoading: boolean = false;

constructor(private router: Router, private authService: AuthService) {}
onRegister() {
  if(!this.name || !this.email || !this.password) {
    this.errorMessage = 'Please fill in all fields.';
    return;
  }
  this.isLoading = true;
  this.errorMessage = '';

  const request : RegisterRequest = {
    name: this.name,
    email: this.email,
    password: this.password
  };
  this.authService.register(request).subscribe({
    next: (response: any) => {
      console.log('Registration Response:', response);
      this.isLoading = false;
      this.successMessage = 'Registration successful. You can now log in.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    },
    error: (error: any) => {
      this.isLoading = false;
      // this.errorMessage = 'Registration failed. Please try again.';
      if (error.status === 400) {
        this.errorMessage = 'Email already in use. Please use a different email.';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
      console.error('Registration error:', error);
    }

  });
}
}
