import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { parseToken } from '../../functions/parseToken';
import { RefreshTokenResponse } from '../../interfaces/HTTP/RefreshToken';
import { TokenDecoded } from '../../interfaces/HTTP/Storage/TokenDecoded';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para manejar el uso de JWT para autenticación
 * https://www.jwt.io/introduction#what-is-json-web-token
 */
export class TokenService {
  //URL base de la API
  private BASE_URL = environment.api.url;
  private REFRESH_TOKEN_ENDPOINT: string = environment.api.endpoints.public.refreshToken;

  //Local Storage
  private ACCESS_TOKEN_LOCALSTORAGE: string = 'accessToken';
  private REFRESH_TOKEN_LOCALSTORAGE: string = 'refreshToken';

  #http = inject(HttpClient);

  /**
   * Devuelve los datos almacenados en el JWT codificados desde el servidor
   * usando la interfaz TokenDecoded (de momento es solo la expiración, pero se puede usar para enviar información sensible codificada)
   * @returns
   */
  getTokenData(): TokenDecoded | null {
    const token = this.getAccessToken();
    if (token === null) return null;

    return parseToken(token);
  }

  /**
   * Comprueba si el access token está expirado (usado por el refresh interceptor)
   * @returns true si está expirado, false si no.
   */
  checkExpiredToken(): boolean {
    const expiration = this.getTokenData()?.exp;
    if (!expiration) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= expiration;
  }

  /**
   * Comprueba que el token almacenado se pueda decodificar con la función
   * paseToken. Si no se puede, es que el token ha sido modificado por el
   * usuario y por tanto es inválido
   * @returns true si el token es válido, false si no
   */
  checkValidToken(): boolean {
    return this.getTokenData() !== null;
  }

  /**
   * Hace una petición al endpoint /auth/refresh enviando el refresh token
   * Si el refresco en el servidor es exitoso, recupera un nuevo access token.
   * Si no, devuelve un error HTTPErrorResponse
   * @returns
   */
  refreshToken(): Observable<any> {
    const url = this.BASE_URL + this.REFRESH_TOKEN_ENDPOINT;
    return this.#http
      .post<RefreshTokenResponse>(url, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((response) => {
          this.setAccessToken(response.accessToken);
        }),
      );
  }

  //Getters y Setters
  /**
   * Guarda el access token en local storage
   * @param token
   */
  setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_LOCALSTORAGE, token);
  }

  /**
   * Guarda el refresh token en local storage
   * @param token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_LOCALSTORAGE, token);
  }

  /**
   * Recupera el access token de local storage. Si no existe, devuelve null
   * @returns string | null
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_LOCALSTORAGE);
  }

  /**
   * Recupera el refresh token de local storage. Si no existe, devuelve null
   * @returns string | null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_LOCALSTORAGE);
  }

  /**
   * Borra el access token y refresh token de local storage
   */
  cleanStorage(): void {
    this.removeToken();
    this.removeRefresthToken();
  }

  private removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_LOCALSTORAGE);
  }

  private removeRefresthToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_LOCALSTORAGE);
  }
}
