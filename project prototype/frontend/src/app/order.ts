import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders/buy';

  constructor(private http: HttpClient) {}

  buyGame(userId: number, gameId: number) {
    return this.http.post(this.apiUrl, { userId, gameId }, { responseType: 'text' });
  }
}