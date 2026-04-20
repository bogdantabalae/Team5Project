import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GameCodeService } from '../game-code.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {

  private gameCodeService = inject(GameCodeService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  private gamesUrl = 'http://localhost:8080/api/games';
  private codesUrl = 'http://localhost:8080/api/game-codes';

  // Data
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

  // Game modal
  showGameModal: boolean = false;
  editGame: any = { id: null, title: '', description: '', price: null, imageUrl: '' };

  // Code modal
  showCodeModal: boolean = false;
  editingCode: any = null;
  editCode: string = '';

  // UI state
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.loadGames();
  }

  // ---- Load Data ----
  loadGames() {
    this.http.get<any[]>(this.gamesUrl).subscribe({
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
    this.http.get<any[]>(this.codesUrl).subscribe({
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
    this.filteredGameCodes = this.filterGameId === null
      ? this.gameCodes
      : this.gameCodes.filter(gc => gc.game?.id === this.filterGameId);
    this.cdr.detectChanges();
  }

  // ---- Add Game ----
  addGame() {
    if (!this.newGame.title.trim() || !this.newGame.price) {
      this.showError('Please enter at least a title and price.');
      return;
    }
    this.http.post<any>(this.gamesUrl, this.newGame).subscribe({
      next: () => {
        setTimeout(() => {
          this.newGame = { title: '', description: '', price: null, imageUrl: '' };
          this.cdr.detectChanges();
        }, 0);
        this.showSuccess('Game added successfully!');
        this.loadGames();
      },
      error: () => this.showError('Failed to add game.')
    });
  }

  // ---- Add Code ----
  addCode() {
    if (!this.selectedGameId || !this.newCode.trim()) {
      this.showError('Please select a game and enter a code.');
      return;
    }
    this.gameCodeService.addGameCode(this.selectedGameId, this.newCode.trim()).subscribe({
      next: () => {
        setTimeout(() => {
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

  // ---- Game Modal ----
  openGameModal(game: any) {
    this.editGame = { ...game }; // copy so we don't mutate the table directly
    this.showGameModal = true;
    this.cdr.detectChanges();
  }

  closeGameModal() {
    this.showGameModal = false;
    this.editGame = { id: null, title: '', description: '', price: null, imageUrl: '' };
    this.cdr.detectChanges();
  }

  saveGameEdit() {
    if (!this.editGame.title.trim() || !this.editGame.price) {
      this.showError('Title and price are required.');
      return;
    }
    this.http.put<any>(`${this.gamesUrl}/${this.editGame.id}`, this.editGame).subscribe({
      next: () => {
        this.showSuccess('Game updated successfully!');
        this.closeGameModal();
        this.loadGames();
      },
      error: () => this.showError('Failed to update game.')
    });
  }

  deleteGame(id: number) {
    if (!confirm('Delete this game? This will also remove all its codes!')) return;
    this.http.delete(`${this.gamesUrl}/${id}`).subscribe({
      next: () => {
        this.showSuccess('Game deleted.');
        this.closeGameModal();
        this.loadGames();
      },
      error: () => this.showError('Failed to delete game.')
    });
  }

  // ---- Code Modal ----
  openCodeModal(gc: any) {
    this.editingCode = gc;
    this.editCode = gc.code;
    this.showCodeModal = true;
    this.cdr.detectChanges();
  }

  closeCodeModal() {
    this.showCodeModal = false;
    this.editingCode = null;
    this.editCode = '';
    this.cdr.detectChanges();
  }

  saveCodeEdit() {
    if (!this.editCode.trim()) {
      this.showError('Code cannot be empty.');
      return;
    }
    this.http.put<any>(`${this.codesUrl}/${this.editingCode.id}`, { code: this.editCode }).subscribe({
      next: () => {
        this.showSuccess('Code updated successfully!');
        this.closeCodeModal();
        this.loadGameCodes();
      },
      error: () => this.showError('Failed to update code.')
    });
  }

  deleteCode(id: number) {
    if (!confirm('Are you sure you want to delete this game code?')) return;
    this.gameCodeService.deleteGameCode(id).subscribe({
      next: () => {
        this.showSuccess('Game code deleted.');
        this.closeCodeModal();
        this.loadGameCodes();
      },
      error: () => this.showError('Failed to delete game code.')
    });
  }

  // ---- Notifications ----
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