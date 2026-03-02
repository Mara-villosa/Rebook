import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth-service/auth-service';
import { TokenService } from '../../services/token-service/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //Servicios
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  //URL de la API
  const BASE_URL = environment.api.url;

  //Access token y API Key
  const API_KEY = environment.api.key;
  const token = tokenService.getAccessToken();

  const isRefreshRequest = req.url === `${BASE_URL}/auth/refresh`;

  /**
   * No se interceptan requests que no vayan a la API del Backend
   */
  if (!req.url.includes(BASE_URL)) return next(req);

  /**
   * Para los endpoints públicos de la API (login, signup y refresh)
   * no se usa el access token, se usa la API KEY
   * (porque el token no existe aún o necesita refrescarse)
   */
  if (!token || isRefreshRequest) {
    return next(
      req.clone({
        setHeaders: { 'x-api-key': API_KEY },
      }),
    );
  }

  /**
   * Si estamos en una llamada a enpoint privado de la API se comprueba la validez del token.
   * Si no es válido, se hace log out.
   */
  if (!tokenService.checkValidToken()) {
    authService.logout();
    return EMPTY;
  }

  /**
   * Si estamos en una llamada a enpoint privado de la API se incluye
   * el access token en la cabecera de la autenticación
   */
  return next(
    req.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    }),
  );
};
