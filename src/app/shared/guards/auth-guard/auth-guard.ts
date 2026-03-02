import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

