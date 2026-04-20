import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔥 usamos SIGNAL (estado real de la app)
  const isAuth = authService.authState();

  if (isAuth) {
    return true;
  }

  // 🔥 redirección limpia
  return router.createUrlTree(['/auth/login']);
};