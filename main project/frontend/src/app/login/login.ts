import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  isLoginMode = true;

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (!this.isLoginMode) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.authService.register(this.email, this.password).subscribe({
        next: (res) => {
          if (res.success) {
            this.authService.saveSession(res.userId, res.role);
            this.router.navigate(['/store']);
          } else {
            this.errorMessage = res.message;
          }
        },
        error: () => {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      });

    } else {
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          if (res.success) {
            this.authService.saveSession(res.userId, res.role);
            this.router.navigate(['/store']);
          } else {
            this.errorMessage = res.message;
          }
        },
        error: () => {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      });
    }
  }
}