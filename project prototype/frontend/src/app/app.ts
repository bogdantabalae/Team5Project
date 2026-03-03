import { Component, signal } from '@angular/core';
import { StoreComponent } from './store/store';

@Component({
  selector: 'app-root',
  imports: [StoreComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('game-store');
}
