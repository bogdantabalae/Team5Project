import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GameCodeService } from '../game-code.service';
import { GameService } from '../game';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {

  private gameCodeService = inject(GameCodeService);
  private gameService = inject(GameService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  gameCodes: any[] = [];
  filteredGameCodes: any[] = [];
  games: any[] = [];

  // Add game form
  newGame = { title: '', description: '', price: null as number | null, imageUrl: '' };

  // Add code form
  selectedGameId: number | null = null;
  newCode: string = '';

  // Filter
  filterGameId: number | null = null;

  // UI state
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.http.get<any[]>('http://localhost:8080/api/games').subscribe({
      next: (data) => {
        this.games = data;
        this.loadGameCodes();
        this.cdr.detectChanges();
      },
      error: () => this.showError('Failed to load games.')
    });
  }

  loadGameCodes() {
    this.isLoading = true;
    this.gameCodeService.getAllGameCodes().subscribe({
      next: (data) => {
        this.gameCodes = data;
        this.filterCodes();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        setTimeout(() => {
          this.showError('Failed to load game codes.');
          this.isLoading = false;
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

  filterCodes() {
    if (this.filterGameId === null) {
      this.filteredGameCodes = this.gameCodes;
    } else {
      this.filteredGameCodes = this.gameCodes.filter(
        gc => gc.game?.id === this.filterGameId
      );
    }
    this.cdr.detectChanges();
  }

  addGame() {
  if (!this.newGame.title.trim() || !this.newGame.price) {
    this.showError('Please enter at least a title and price.');
    return;
  }

  this.http.post<any>('http://localhost:8080/api/games', this.newGame).subscribe({
    next: () => {
      setTimeout(() => {          // ← wrap in setTimeout
        this.newGame = { title: '', description: '', price: null, imageUrl: '' };
        this.cdr.detectChanges();
      }, 0);
      this.showSuccess('Game added successfully!');
      this.loadGames();
    },
    error: () => this.showError('Failed to add game.')
  });
}

  addCode() {
  if (!this.selectedGameId || !this.newCode.trim()) {
    this.showError('Please select a game and enter a code.');
    return;
  }

  this.gameCodeService.addGameCode(this.selectedGameId, this.newCode.trim()).subscribe({
    next: () => {
      setTimeout(() => {          // ← wrap in setTimeout
        this.newCode = '';
        this.selectedGameId = null;
        this.cdr.detectChanges();
      }, 0);
      this.showSuccess('Game code added successfully!');
      this.loadGameCodes();
    },
    error: () => this.showError('Failed to add game code.')
  });
}

  deleteCode(id: number) {
    if (!confirm('Are you sure you want to delete this game code?')) return;

    this.gameCodeService.deleteGameCode(id).subscribe({
      next: () => {
        this.showSuccess('Game code deleted.');
        this.loadGameCodes();
      },
      error: () => this.showError('Failed to delete game code.')
    });
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
    this.cdr.detectChanges();
    setTimeout(() => { this.successMessage = ''; this.cdr.detectChanges(); }, 3000);
  }

  showError(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
    this.cdr.detectChanges();
    setTimeout(() => { this.errorMessage = ''; this.cdr.detectChanges(); }, 3000);
  }
}