import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  signUp(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  signIn(data: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/signin`, data).pipe(
      tap(response => {
        this.storeToken(response.access_token);
      })
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
