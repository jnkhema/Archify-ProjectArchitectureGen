import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.model';
import { environment } from '../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { request } from 'express';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const request : LoginRequest = {
      email: this.email,
      password: this.password
    };
    this.authService.login(request).subscribe({
      next: (response: any) => {
        console.log('Login Response:', response);
        this.isLoading = false;
        localStorage.setItem('userId', response.user.id.toString());
        localStorage.setItem('userName', response.user.name);
        this.router.navigate(['/layout/architecture/create']);
      },
      error: (error: any) => {
        this.isLoading = false;
        // this.errorMessage = 'Login failed. Please try again.';
        //  console.error('Login Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else if (error.status === 400) {
          this.errorMessage = 'Bad request. Please check your input.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
          console.error('Login Error:', error);
      }

    });
  }

}
