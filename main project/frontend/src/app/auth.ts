import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }

  saveSession(userId: number, role: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('userId', userId.toString());
      sessionStorage.setItem('role', role);
    }
  }

  getUserId(): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    return Number(sessionStorage.getItem('userId'));
  }

  getRole(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!sessionStorage.getItem('userId');
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }
}