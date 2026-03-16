/**
 * Esta interfaz contiene los datos enviados y recibidos del endpoint /auth/signup
 */

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface SignUpResponse {}
