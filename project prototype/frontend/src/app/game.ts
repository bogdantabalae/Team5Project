import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/api/games';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<any[]>(this.apiUrl);
  }
}