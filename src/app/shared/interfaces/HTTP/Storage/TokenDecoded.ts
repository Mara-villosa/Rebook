/**
 * Esta interfaz contiene los datos codificados en el JWT de autenticación
 * (www.jwt.io/introduction#what-is-json-web-token)
 */

export interface TokenDecoded {
  id: string;
  exp: number;
}
