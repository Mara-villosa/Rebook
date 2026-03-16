/**
 * Esta interfaz contiene los datos enviados y recibidos del endpoint /auth/login
 */
export interface LogInRequest {
  email: string;
  password: string;
}

export interface LogInResponse {
  userData: {
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
