import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/api/users`;
  private authUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  // Add a new user
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }

  // Get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update user
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.userId}`, user, { responseType: 'text' });
  }

  // Send OTP
  sendOtp(mobile: string): Observable<any> {
    return this.http.post(`${this.authUrl}/send-otp`, { mobile }, { responseType: 'text' });
  }

  // Verify OTP
  verifyOtp(mobile: string, otp: string): Observable<any> {
    return this.http.post(`${this.authUrl}/verify-otp`, { mobile, otp }, { responseType: 'text' });
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//    private apiUrl = 'http://localhost:8082/api/users';
//   // private apiUrl = 'http://192.168.29.31:8082/api/users';

//   constructor(private http: HttpClient) {}

//   // // Method to add a new user
//   // addUser(user: any): Observable<any> {
//   //   return this.http.post(this.apiUrl, user);
//   // }
//   addUser(user: any): Observable<any> {
//   return this.http.post(this.apiUrl, user, { responseType: 'text' });
// }

//   // Method to get all users (for later listing)
//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
//   updateUser(user: any): Observable<any> {
//   return this.http.put(`${this.apiUrl}/${user.userId}`, user, { responseType: 'text' });
// }

//   // updateUser(user: any): Observable<any> {
//   //   return this.http.put(`${this.apiUrl}/${user.userId}`, user);
//   // }
// }
