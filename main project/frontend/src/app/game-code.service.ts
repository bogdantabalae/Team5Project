import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameCodeService {

  private apiUrl = 'https://team5project.onrender.com/api/game-codes';

  constructor(private http: HttpClient) {}

  getAllGameCodes() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addGameCode(gameId: number, code: string) {
    return this.http.post<any>(this.apiUrl, { gameId, code });
  }

  deleteGameCode(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
