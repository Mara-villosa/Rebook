import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LogInRequest, LogInResponse } from '../../interfaces/HTTP/LogIn';
import { SignUpRequest, SignUpResponse } from '../../interfaces/HTTP/SignUp';
import { TokenService } from '../token-service/token-service';
import { UserService } from '../user-service/user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = environment.api.url;
  private LOGIN_ENDPOINT: string = environment.api.endpoints.public.login;
  private SIGNUP_ENDPOINT: string = environment.api.endpoints.public.signup;

  #http = inject(HttpClient);
  #router = inject(Router);
  #token = inject(TokenService);
  #user = inject(UserService);

  // 🔥 ESTADO REACTIVO
  private authSignal = signal<boolean>(this.isAuthenticated());
  authState = this.authSignal.asReadonly();

  login(email: string, password: string): Observable<LogInResponse> {
    const url = this.BASE_URL + this.LOGIN_ENDPOINT;

    const request: LogInRequest = { email, password };

    return this.#http.post<LogInResponse>(url, request).pipe(
      tap((response) => {
        this.#token.setAccessToken(response.accessToken);
        this.#token.setRefreshToken(response.refreshToken);
        this.authSignal.set(true);
      })
    );
  }

  signup(data: SignUpRequest): Observable<SignUpResponse> {
    const url = this.BASE_URL + this.SIGNUP_ENDPOINT;
    return this.#http.post<SignUpResponse>(url, data);
  }

  logout(): void {
    this.#token.cleanStorage();
    this.authSignal.set(false);
    this.#router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.#token.getTokenData() !== null;
  }

  checkTokens(): void {
    if (!this.#token.checkValidToken()) {
      this.logout();
      return;
    }

    if (this.#token.checkExpiredToken()) {
      this.#token.refreshToken().subscribe({
        error: () => this.logout(),
      });
    }
  }

  initAuthState(): void {
    this.authSignal.set(this.isAuthenticated());
  }

}