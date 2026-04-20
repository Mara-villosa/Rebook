import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth-service/auth-service';
import { TokenService } from '../../services/token-service/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const BASE_URL = environment.api.url;
  const PUBLIC_ENDPOINTS = Object.values(environment.api.endpoints.public);
  const API_KEY = environment.api.key;

  const token = tokenService.getAccessToken();

  // 🔹 1. Solo interceptar peticiones a nuestra API
  if (!req.url.includes(BASE_URL)) {
    return next(req);
  }

  // 🔹 2. Headers base
  const headers: { [key: string]: string } = {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  };

  // 🔹 3. Detectar endpoint público
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
    req.url.includes(endpoint)
  );

  // 🔹 4. Añadir token solo si es privado
  if (!isPublicEndpoint && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 🔹 5. Clonar request
  const clonedReq = req.clone({ setHeaders: headers });

  // 🔹 6. Manejo de errores seguro
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && !isPublicEndpoint) {
        // ❌ SOLO limpiar sesión, NO forzar logout inmediato
        tokenService.cleanStorage();

        // opcional: solo redirigir si no estás ya en login
        if (!window.location.pathname.includes('/auth/login')) {
          authService.logout();
        }
      }

      return throwError(() => error);
    })
  );
};