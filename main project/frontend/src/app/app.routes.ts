import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { StoreComponent } from './store/store';
import { AdminComponent } from './admin/admin';
import { HomeComponent } from './home/home';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
];