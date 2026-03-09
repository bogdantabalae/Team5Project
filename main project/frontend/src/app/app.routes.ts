import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { StoreComponent } from './store/store';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
];