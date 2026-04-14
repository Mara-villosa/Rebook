/**
 * Esta interfaz contiene los datos enviados y recibidos del endpoint /auth/signup
 */

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  lastname: string;
  id_document: string;
  birthday: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
}

export interface SignUpResponse {}
