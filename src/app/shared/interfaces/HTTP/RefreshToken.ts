/**
 * Esta interfaz contiene los datos enviados y recibidos del endpoint /auth/refresh
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
