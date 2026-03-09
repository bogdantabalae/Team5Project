import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }

  saveSession(userId: number, role: string) {
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('role', role);
  }

  getUserId(): number {
    return Number(sessionStorage.getItem('userId'));
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userId');
  }

  logout() {
    sessionStorage.clear();
  }
}