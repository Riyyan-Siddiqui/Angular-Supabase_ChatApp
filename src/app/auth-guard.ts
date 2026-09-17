import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const loggedIn = await auth.isLoggedIn();

  if (!loggedIn) {
    return router.createUrlTree(['/login']);
  }

  return true;
};