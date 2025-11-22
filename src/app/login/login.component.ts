import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mobile: string = '';
  otp: string = '';
  otpSent: boolean = false;
  message: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  userName: string = '';
  selectedShop: string = '';
  role : string='';

  shops: Array<{ id: string, name: string }> = [];

  private authUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {} // ✅ Inject Router

  sendOtp(): void {
    this.http.post(`${this.authUrl}/send-otp`, { mobile: this.mobile }, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.message = 'OTP sent successfully';
          this.otpSent = true;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
          this.message = 'Failed to send OTP. Please try again.';
          this.otpSent = false;
        }
      });
  }

  verifyOtp(): void {
    this.http.post<any>(`${this.authUrl}/verify-otp`, { mobile: this.mobile, otp: this.otp })
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.message = 'Login successful';
            this.isLoggedIn = true;
            this.userName = response.user.name;
            this.shops = response.user.shops || [];
            this.errorMessage = '';
          } else {
            this.message = '';
            this.errorMessage = 'OTP verification failed.';
          }
        },
        error: (error) => {
          console.error('OTP verification failed:', error);
          this.message = '';
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
      });
  }

  selectShop(shopName: string): void {
  this.selectedShop = shopName;
  this.role = this.role;
  this.userName = this.userName || 'User'; 
  
  console.log('Shop selected:', shopName, 'User:', this.userName);


  // Optional: use actual user name if available
  
}
  // selectShop(shopName: string): void {
  //   this.selectedShop = shopName;

  //   // ✅ Navigate to Dashboard with state
  //   this.router.navigate(['/dashboard'], {
  //     state: {
  //       userName: this.userName,
  //       selectedShop: this.selectedShop
  //     }
  //   });
  // }
  goToDashboard(shopName: string): void {
  this.selectedShop = shopName;
  this.userName = this.userName || 'User';

  this.router.navigate(['/dashboard'], {
    state: {
      userName: this.userName,
      selectedShop: this.selectedShop,
      role: this.role
    }
  });
}
//   goToDashboard(shopName: string): void {
//      this.selectedShop = shopName;
//   this.userName = this.userName || 'User'; 
//   this.router.navigate(['/dashboard']);
// }
}

// import { Component } from '@angular/core';
// import { environment } from '../environments/environment';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   mobile: string = '';
//   otp: string = '';
//   otpSent: boolean = false;
//   message: string = '';
//   isLoggedIn: boolean = false;
//   errorMessage: string = '';
//   successMessage: string = '';
//   userName: string = '';
//   selectedShop: string = '';

//   // ✅ Define shops as an array of objects
//   shops: Array<{ id: string, name: string }> = [];

//   private authUrl = `${environment.apiBaseUrl}/auth`;

//   constructor(private http: HttpClient) {}

//   sendOtp(): void {
//     this.http.post(`${this.authUrl}/send-otp`, { mobile: this.mobile }, { responseType: 'text' })
//       .subscribe({
//         next: () => {
//           this.message = 'OTP sent successfully';
//           this.otpSent = true;
//           this.errorMessage = '';
//         },
//         error: (error) => {
//           console.error('Error sending OTP:', error);
//           this.message = 'Failed to send OTP. Please try again.';
//           this.otpSent = false;
//         }
//       });
//   }

//   verifyOtp(): void {
//     this.http.post<any>(`${this.authUrl}/verify-otp`, { mobile: this.mobile, otp: this.otp })
//       .subscribe({
//         next: (response) => {
//           if (response.status === 'success') {
//             this.message = 'Login successful';
//             this.isLoggedIn = true;

//             // ✅ Properly assign shops as object list
//             this.shops = response.user.shops || [];

//             this.errorMessage = '';
//           } else {
//             this.message = '';
//             this.errorMessage = 'OTP verification failed.';
//           }
//         },
//         error: (error) => {
//           console.error('OTP verification failed:', error);
//           this.message = '';
//           this.errorMessage = 'Invalid OTP. Please try again.';
//         }
//       });
//   }
//   selectShop(shopName: string): void {
//   this.selectedShop = shopName;
// }
// }
