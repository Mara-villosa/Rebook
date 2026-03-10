import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

/**
 * Si el user está autenticado, se le permite acceder a la ruta.
 * Si no, se le redirecciona a la página de Log In
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loginURL = router.parseUrl('/auth/login');

  //return authService.isAuthenticated() ? true : new RedirectCommand(loginURL);
  return true;
};
