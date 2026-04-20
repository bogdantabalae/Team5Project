import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
    private http = inject(HttpClient);

    private gamesUrl = 'http://localhost:8080/api/games';

    games: any[] = [];
    featuredGames: any[] = [];
    isLoading = false;
    errorMessage = '';

    ngOnInit(): void {
        this.loadGames();
    }

    loadGames(): void {
        this.isLoading = true;
        this.http.get<any[]>(this.gamesUrl).subscribe({
            next: (data) => {
                this.games = data ?? [];
                this.featuredGames = this.games.slice(0, 4);
                this.isLoading = false;
            },
            error: () => {
                this.errorMessage = 'Failed to load featured games.';
                this.isLoading = false;
            }
        });
    }
}