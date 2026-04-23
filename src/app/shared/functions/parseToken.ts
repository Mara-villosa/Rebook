import { TokenDecoded } from '../interfaces/HTTP/Storage/TokenDecoded';

/**
 * Decodifica un token con formato JWT (https://www.jwt.io/introduction#what-is-json-web-token)
 * y devuelve los datos obtenidos según lo indicado en la interfaz TokenDecoded.
 * Si no puede decodificar el token (porque sea incorrecto o el usuario lo haya manipulado) devuelve null
 * @param encodedToken token JWT codificado
 * @returns TokenDecoded con los datos decodificados o Null
 */
export function parseToken<T = TokenDecoded>(encodedToken: string): T | null {
  try {
    //Un JWT tiene tres partes separadas por puntos (Header, Paylod y Signature)
    const splitToken = encodedToken?.split('.');

    //Si no se han podido recuperar al menos el Header y Paylod devolvemos null
    if (!splitToken || splitToken.length < 2) return null;

    //Recuperamos los datos del Payload
    let [, token] = splitToken;

    //Se devuelven los datos paseados según TokenDecoded
    return JSON.parse(atob(token)) as T;
  } catch (e) {
    console.error(e);
    return null;
  }
}
