import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Not logged in at all → go to login page
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Logged in but not an ADMIN → go to store
  if (authService.getRole() !== 'ADMIN') {
    router.navigate(['/store']);
    return false;
  }

  // ADMIN → allow access
  return true;
};
