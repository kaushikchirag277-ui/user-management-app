import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mobile = '';
  otp = '';
  otpSent = false;
  message = '';
  errorMessage = '';

  userName = '';
  role = '';
  shops: Array<{ id: string, name: string }> = [];

  private authUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  sendOtp(): void {
    this.http.post(`${this.authUrl}/send-otp`, { mobile: this.mobile }, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.otpSent = true;
          this.message = 'OTP sent successfully';
        },
        error: () => {
          this.errorMessage = 'Failed to send OTP';
        }
      });
  }

  verifyOtp(): void {
    this.http.post<any>(`${this.authUrl}/verify-otp`, { mobile: this.mobile, otp: this.otp })
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {

            /** ✅ Store JWT Token */
            localStorage.setItem('token', response.token);

            /** Store user details */
            this.userName = response.user.name;
            this.role = response.user.role;
            this.shops = response.user.shops;

            /** Save additional info if needed */
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('role', this.role);

            this.message = 'Login successful';

          } else {
            this.errorMessage = 'OTP verification failed.';
          }
        },
        error: () => {
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
      });
  }

  /** When shop is selected */
  goToDashboard(shop: any): void {
    localStorage.setItem('selectedShop', shop.name);

    /** Redirect based on role */
    if (this.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.role === 'collector') {
      this.router.navigate(['/collector-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
