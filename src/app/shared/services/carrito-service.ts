import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  AddBookToCartRequest,
  AddBookToCartResponse,
  BuyCartResponse,
  GetBooksFromCartResponse,
  RemoveBookFromCartRequest,
} from '../interfaces/HTTP/Books';
import { AuthService } from './auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  #authService = inject(AuthService);
  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // ESTADO REACTIVO CARRITO
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  // AÑADIR AL CARRITO
  addToCart(data: AddBookToCartRequest): Observable<AddBookToCartResponse> {
    return new Observable((observer) => {
      this.http
        .post<AddBookToCartResponse>(`${this.BASE_URL}${this.endpoints.addToCart}`, data)
        .subscribe({
          next: (res) => {
            this.getCart().subscribe();
            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
    });
  }

  // QUITAR DEL CARRITO
  removeFromCart(data: RemoveBookFromCartRequest): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.BASE_URL}${this.endpoints.removeFromCart}`, data).subscribe({
        next: (res) => {
          this.getCart().subscribe();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  // OBTENER CARRITO
  getCart(): Observable<GetBooksFromCartResponse> {
    return new Observable((observer) => {
      this.http
        .get<GetBooksFromCartResponse>(`${this.BASE_URL}${this.endpoints.getCart}`)
        .subscribe({
          next: (res) => {
            const count = res.books?.length ?? 0;

            // 🔥 ACTUALIZA CONTADOR GLOBAL
            this.setCartCount(count);

            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
    });
  }

  // COMPRAR / ALQUILAR CARRITO
  buyCart(): Observable<BuyCartResponse> {
    return this.http.get<BuyCartResponse>(`${this.BASE_URL}${this.endpoints.buyCart}`);
  }
}
