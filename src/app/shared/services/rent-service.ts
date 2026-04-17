import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RentBookResponse } from '../interfaces/Rent/rent-book-request';
import { CheckRentedBookResponse } from '../interfaces/Rent/check-rented-book-request';
import { ExtendRentResponse } from '../interfaces/Rent/extend-rent-request';
import { GetRentedBooksResponse } from '../interfaces/Book/get-rented-books-response';

@Injectable({
  providedIn: 'root',
})
export class RentService {

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  constructor(private http: HttpClient) {}

  // Alquilar libro
  rentBook(bookId: number): Observable<RentBookResponse> {
    return this.http.post<RentBookResponse>(
      this.BASE_URL + this.endpoints.rentBook,
      { id: bookId }
    );
  }

  // Obtener libros alquilados del usuario
  getMyRentedBooks(): Observable<GetRentedBooksResponse> {
    return this.http.get<GetRentedBooksResponse>(
      this.BASE_URL + this.endpoints.getRentedFromUser
    );
  }

  // Comprobar alquiler de un libro
  checkRent(bookId: number): Observable<CheckRentedBookResponse> {
    return this.http.post<CheckRentedBookResponse>(
      this.BASE_URL + this.endpoints.checkRent,
      { id: bookId }
    );
  }

  // Extender alquiler
  extendRent(bookId: number): Observable<ExtendRentResponse> {
    return this.http.post<ExtendRentResponse>(
      this.BASE_URL + this.endpoints.extendRent,
      { id: bookId }
    );
  }

  // Devolver libro
  returnBook(bookId: number): Observable<void> {
    return this.http.post<void>(
      this.BASE_URL + this.endpoints.returnRentedBook,
      { id: bookId }
    );
  }
}