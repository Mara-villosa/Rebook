import { Injectable } from '@angular/core';
import { UserData } from '../../interfaces/Storage/UserData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Nombre del objeto guardado en local storage
  private USER_LOCAL_STORAGE: string = 'user';

  /**
   * Guarda un objeto con el nombre y apellidos del usuario en
   * local storage
   * @param userData objeto con nombre y apellidos a guardar
   */
  storeLocalUser(userData: UserData): void {
    localStorage.setItem(this.USER_LOCAL_STORAGE, JSON.stringify(userData));
  }

  /**
   * Recupera los datos de usuario almacenados en local storage.
   * Si no puede, devuelve null. Si puede, devuelve un objeto de tipo
   * UserData con los datos recuperados
   * @returns UserData | nullº
   */
  getLocalUserData(): UserData | null {
    let data = localStorage.getItem(this.USER_LOCAL_STORAGE);
    if (!data) return null;

    let user: UserData = JSON.parse(data);

    return user;
  }

  /**
   * Elimina los datos del usuario del local storage
   */
  cleanStorage(): void {
    localStorage.removeItem(this.USER_LOCAL_STORAGE);
  }
}
