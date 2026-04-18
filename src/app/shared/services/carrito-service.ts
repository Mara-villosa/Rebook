import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import {
  BuyCartResponse,
  GetBooksFromCartResponse,
  AddBookToCartRequest,
  AddBookToCartResponse,
  RemoveBookFromCartRequest
} from '../interfaces/HTTP/Books';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // AÑADIR AL CARRITO
  addToCart(data: AddBookToCartRequest): Observable<AddBookToCartResponse> {
    return this.http.post<AddBookToCartResponse>(
      `${this.BASE_URL}${this.endpoints.addToCart}`,
      data
    );
  }

  // QUITAR DEL CARRITO
  removeFromCart(data: RemoveBookFromCartRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.endpoints.removeFromCart}`,
      data
    );
  }

  // OBTENER CARRITO
  getCart(): Observable<GetBooksFromCartResponse> {
    return this.http.get<GetBooksFromCartResponse>(
      `${this.BASE_URL}${this.endpoints.getCart}`
    );
  }

  // COMPRAR / ALQUILAR CARRITO (según backend: GET)
  buyCart(): Observable<BuyCartResponse> {
    return this.http.get<BuyCartResponse>(
      `${this.BASE_URL}${this.endpoints.buyCart}`
    );
  }
}