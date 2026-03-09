import { Component } from '@angular/core';
import {CommonModule } from '@angular/common';
import { GameService } from '../game';
import { OrderService } from '../order';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class StoreComponent {

  games: any[] = [];

  constructor(private gameService: GameService, private orderService: OrderService) {}

  ngOnInit() {
    this.gameService.getGames().subscribe((data: any[]) => {
      this.games = data;
});
  }

  buyGame(game: any) {

  const userId = 1; // TEMPORARY (until login system)

  this.orderService.buyGame(userId, game.id)
    .subscribe({
      next: (code) => {
        alert("Purchase successful! Your code: " + code);
      },
      error: () => {
        alert("Game out of stock or error occurred");
      }
    });
}
}