import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, NEVER, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth-service/auth-service';
import { TokenService } from '../../services/token-service/token-service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  //Servicios
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  //URL base de la API backend
  const BASE_URL = environment.api.url;

  //Access token
  const token = tokenService.getAccessToken();

  const isRefreshRequest = req.url === `${BASE_URL}/auth/refresh`;

  //No se interceptan llamadas que no vayan a la API del backend
  if (!req.url.includes(BASE_URL)) return next(req);

  /**
   * Si es una llamada de login o signup donde no existe access token
   * no se comprueba si se tiene que refrescar y no se intercepta la request
   */
  if (!token) return next(req);

  /**
   * Si es una petición de refresco no se intercepta
   * (crearía un bucle infinito)
   */
  if (isRefreshRequest) return next(req);

  /**
   * Si es una llamada a un endpoint privado de la API del backend se comprueba si el token está expirado.
   * Si es así, se intenta refrescar. Si no se puede refrescar, se hace logout
   */
  if (tokenService.checkExpiredToken()) {
    return tokenService.refreshToken().pipe(
      //Si el refresco del token falla se hace logout y se cancela la request
      catchError((err: HttpErrorResponse) => {
        authService.logout();
        return NEVER;
      }),
      //Si el refresco tiene éxito, dejamos pasar la request (el Token Service ya se ha encargado de actualizar el access token)
      switchMap((response) => {
        return next(req);
      }),
    );
  } else {
    return next(req);
  }
};
