import { TokenDecoded } from '../interfaces/Storage/TokenDecoded';

export function parseToken<T = TokenDecoded>(encodedToken: string): T | null {
  try {
    const splitToken = encodedToken?.split('.');
    if (!splitToken || splitToken.length < 2) return null;
    let [, token] = splitToken;
    return JSON.parse(atob(token)) as T;
  } catch (e) {
    console.error(e);
    return null;
  }
}
