import { Routes } from '@angular/router';
import { StoreComponent } from './store/store';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'admin', component: AdminComponent },
];