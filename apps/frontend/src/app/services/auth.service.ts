import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  signUp(data: { name: string; email: string; password: string }): Observable<any> {
    console.log('SignUp Request Data:', data);
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      tap(
        response => {
          console.log('SignUp Response:', response);
          this.snackBar.open('Sign Up Successful! Redirecting to Sign In...', 'Close', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Sign Up Failed. Please try again.', 'Close', { duration: 3000 });
        }
      )
    );
  }
  
  signIn(data: { email: string; password: string }): Observable<any> {
    console.log('SignIn Request Data:', data);
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/signin`, data).pipe(
      tap(
        response => {
          console.log('SignIn Response:', response);
          this.storeToken(response.access_token);
          this.snackBar.open('Sign In Successful!', 'Close', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Sign In Failed. Please check your credentials.', 'Close', { duration: 3000 });
        }
      )
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
  }

  isLoggedIn(): boolean {
    if (this.isTokenExpired()) {
      this.logout(); // Token is expired, log out the user
      return false;
    }
    return !!this.getToken();
  }  
}
