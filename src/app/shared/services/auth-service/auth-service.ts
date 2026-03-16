import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  //URL Base de la API
  private BASE_URL: string = environment.api.url;
  private LOGIN_ENDPOINT: string = environment.api.endpoints.public.login;
  private SIGNUP_ENDPOINT: string = environment.api.endpoints.public.signup;

  //Servicios
  #http = inject(HttpClient);
  #router = inject(Router);
  #token = inject(TokenService);
  #user = inject(UserService);

  /**
   * Hace una petición de log in a la Api. Devuelve un observable con
   * HTTPErrorResponse si la petción falla, o con los datos del usuario
   * descritos en LogInResponse si la petición es exitosa.
   * @param email email del usuario
   * @param password contraseña del usuario
   * @returns Observable<LogInResponse>
   */
  login(email: string, password: string): Observable<LogInResponse> {
    this.cleanStorage();

    const url = this.BASE_URL + this.LOGIN_ENDPOINT;
    const request: LogInRequest = {
      email,
      password,
    };

    return this.#http.post<LogInResponse>(url, request).pipe(
      tap((response) => {
        //Guardar token de acceso y de refresco
        this.#token.setAccessToken(response.accessToken);
        this.#token.setRefreshToken(response.refreshToken);

        //Guardar datos del usuario en LocalStorage
        this.#user.storeLocalUser({
          name: response.userData.name,
          email: response.userData.email,
        });
      }),
    );
  }

  /**
   * Realiza una petición de registro a la API con los datos pasados.
   * Si no se puede realizar el registro, devuelve HTTPErrorResponse en el
   * observable
   * @param name nombre del usuario
   * @param lastname apellidos del usuario
   * @param email email del usuario
   * @param password contraseña del usuario
   * @returns Observable<SignUpResponse>
   */
  signup(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ): Observable<SignUpResponse> {
    this.cleanStorage();

    const url = this.BASE_URL + this.SIGNUP_ENDPOINT;
    const user: SignUpRequest = {
      name,
      email,
      password,
    };

    return this.#http.post<SignUpResponse>(url, user);
  }

  /**
   * Elimina los datos almacenados en memoria del usuario y su token de acceso
   * y devuelve a la pantalla de inicio de sesión
   */
  logout() {
    this.cleanStorage();
    this.#router.navigate(['/auth/login']);
  }

  /**
   * Elimina todos los datos almacenados en memoria de usuario y tokens
   */
  cleanStorage(): void {
    this.#token.cleanStorage();
    this.#user.cleanStorage();
  }

  /**
   * Comprueba si existe el access token en local storage y si esta es válida.
   * Si es así, devuelve true y considera al user autenticado.
   * @returns true si el user está autenticado, false si no
   */
  isAuthenticated(): boolean {
    return this.#token.getTokenData() !== null;
  }

  /**
   * Comprueba si los tokens de access y refresh son válidos y
   * si se necesita refrescar el access token
   * @returns
   */
  checkTokens(): void {
    //Comprobar si existe token y es válido
    if (!this.#token.checkValidToken()) {
      this.logout();
      return;
    }

    /**
     * Comprueba si el token está expirado
     * Si es así, prueba a refrescar y si no puede refrescar
     * hace log out
     */
    if (this.#token.checkExpiredToken()) {
      this.#token.refreshToken().subscribe({
        error: (err) => {
          console.log(err);
          this.logout();
        },
      });
    }
  }
}
