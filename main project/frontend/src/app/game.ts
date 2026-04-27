import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://team5project.onrender.com/api/games';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<any[]>(this.apiUrl);
  }
}