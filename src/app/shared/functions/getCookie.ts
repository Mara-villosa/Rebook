export function getCookie(cookieName: string): string | null {
  const name = cookieName + '=';
  const cookies = document.cookie.split(';');

  //Recorre todas las cookies almacenadas en el navegador
  for (var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    //Ignora espacios en blanco y avanza hasta el siguiente caracter
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    //Si estamos en la cookie con valor cookieName, devolvemos su valor entero
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  //Si no se ha encontrado ninguna cookie que coincida se devuelve null
  return null;
}
