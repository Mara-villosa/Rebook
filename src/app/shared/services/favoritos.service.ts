import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { GetFavBooksResponse } from '../interfaces/HTTP/Books';
import { AddBookToFavRequest } from '../interfaces/Favs/add-book-to-fav-request';
import { RemoveBookFromFavsRequest } from '../interfaces/Favs/remove-book-from-favs-request'

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

 private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // ➕ AÑADIR FAVORITO
  addToFavs(data: AddBookToFavRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.endpoints.addBookToFavs}`,
      data
    );
  }

  // ➖ ELIMINAR FAVORITO
  removeFromFavs(data: RemoveBookFromFavsRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.endpoints.removeBookFromFavs}`,
      data
    );
  }

  // 📥 OBTENER FAVORITOS
  getFavs(): Observable<GetFavBooksResponse> {
    return this.http.get<GetFavBooksResponse>(
      `${this.BASE_URL}${this.endpoints.getFavBooks}`
    );
  }
}