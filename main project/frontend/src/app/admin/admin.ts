import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  private cdr = inject(ChangeDetectorRef);

  gameCodes: any[] = [];
  games: any[] = [];

  // Form fields
  selectedGameId: number | null = null;
  newCode: string = '';

  // UI state
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;



  ngOnInit() {
  this.loadGames();
}

loadGames() {
  this.gameService.getGames().subscribe({
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
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.showError('Failed to load game codes.');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addCode() {
    if (!this.selectedGameId || !this.newCode.trim()) {
      this.showError('Please select a game and enter a code.');
      return;
    }

    this.gameCodeService.addGameCode(this.selectedGameId, this.newCode.trim()).subscribe({
      next: () => {
        this.showSuccess('Game code added successfully!');
        this.newCode = '';
        this.selectedGameId = null;
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

  getGameTitle(gameId: number): string {
    const game = this.games.find(g => g.id === gameId);
    return game ? game.title : 'Unknown';
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
    setTimeout(() => this.errorMessage = '', 3000);
  }
}
