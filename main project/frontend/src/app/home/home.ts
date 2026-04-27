import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
    private http = inject(HttpClient);
    private cdr = inject(ChangeDetectorRef);

    private gamesUrl = 'https://team5project.onrender.com/api/games';

    games: any[] = [];
    featuredGames: any[] = [];

    isLoading = false;
    errorMessage = '';

    ngOnInit(): void {
        this.loadGames();
    }

    loadGames(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.http.get<any[]>(this.gamesUrl).subscribe({
            next: (data) => {
                this.games = data ?? [];
                this.featuredGames = this.games.slice(0, 4);
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Could not load games from the server. Please make sure the backend is running.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getImageUrl(game: any): string {
        return game?.imageUrl && game.imageUrl.trim() !== ''
            ? game.imageUrl
            : 'https://via.placeholder.com/400x240?text=Game+Image';
    }
}