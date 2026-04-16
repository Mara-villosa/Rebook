import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  //Aquí guardamos los libros favoritos
  favorites: any[] = [];

  constructor() {}

  toggleFavorite(libro: any) {
    const index = this.favorites.findIndex((fav) => fav.id === libro.id); //Los libros tendrán un 'id'

    if (index === -1) {
      //Si no está en favoritos, lo añade
      this.favorites.push(libro);
    } else {
      //Si ya está, lo quita
      this.favorites.splice(index, 1);
    }
  }
}
