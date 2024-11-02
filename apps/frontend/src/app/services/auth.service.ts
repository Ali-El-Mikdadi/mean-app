import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable(); // Observable for login status
  private baseUrl = 'http://localhost:3000/api'; // Ensure the base URL includes the /api prefix

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  signUp(data: { name: string; email: string; password: string }): Observable<any> {
    console.log('SignUp Request Data:', data);
    return this.http.post(`${this.baseUrl}/auth/signup`, data).pipe(
      tap({
        next: response => {
          console.log('SignUp Response:', response);
          this.snackBar.open('Sign Up Successful! Redirecting to Sign In...', 'Close', { duration: 3000 });
        },
        error: error => {
          this.snackBar.open('Sign Up Failed. Please try again.', 'Close', { duration: 3000 });
        }
      })
    );
  }
  
  signIn(data: { email: string; password: string }): Observable<any> {
    console.log('SignIn Request Data:', data);
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/auth/signin`, data).pipe(
      tap({
        next: response => {
          console.log('SignIn Response:', response);
          this.storeToken(response.access_token);
          this.snackBar.open('Sign In Successful!', 'Close', { duration: 3000 });
        },
        error: error => {
          this.snackBar.open('Sign In Failed. Please check your credentials.', 'Close', { duration: 3000 });
        }
      })
    );
  }

  private storeToken(token: string): void {
    const currentTime = new Date().getTime(); // Get the current time in milliseconds
    localStorage.setItem('access_token', token);
    localStorage.setItem('token_received_time', currentTime.toString());
  }

  private isTokenExpired(): boolean {
    const tokenReceivedTime = localStorage.getItem('token_received_time');
    if (tokenReceivedTime) {
      const currentTime = new Date().getTime();
      const eightHoursInMillis = 8 * 60 * 60 * 1000;
  
      if (currentTime - parseInt(tokenReceivedTime, 10) > eightHoursInMillis) {
        return true; // Token is expired
      }
    }
    return false; // Token is still valid
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_received_time');
    this.loggedIn.next(false); // Notify that the user is logged out
    this.snackBar.open('You have been logged out', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  
  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, data).pipe(
      tap({
        next: () => {
          this.snackBar.open('Password reset link sent to your email', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to send reset link. Please try again.', 'Close', { duration: 3000 });
        }
      })
    );
  }

  resetPassword(data: { token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, data).pipe(
      tap({
        next: () => {
          this.snackBar.open('Password reset successful', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to reset password. Please try again.', 'Close', { duration: 3000 });
        }
      })
    );
  }

  isLoggedIn(): boolean {
    if (this.isTokenExpired()) {
      this.logout(); // Token is expired, log out the user
      return false;
    }
    return !!this.getToken();
  }  
}