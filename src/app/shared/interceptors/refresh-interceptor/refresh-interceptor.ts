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

  //API backend
  const BASE_URL = environment.api.url;
  const PUBLIC_API_URLS = environment.api.endpoints.public;

  //No se interceptan llamadas que no vayan a la API del backend
  if (!req.url.includes(BASE_URL)) return next(req);

  /**
   * Las llamadas públicas a la API (signup, login y refresh)
   * no se interceptan para refresco de token ya que este no existe o no es relevante.
   * Se usa X-API-KEY para autenticación en su lugar.
   */
  for (const [key, value] of Object.entries(PUBLIC_API_URLS)) {
    if (req.url.includes(value)) return next(req);
  }

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
