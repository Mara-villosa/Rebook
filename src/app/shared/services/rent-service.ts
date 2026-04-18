import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CheckRentedBookRequest,
  CheckRentedBookResponse,
  ExtendRentRequest,
  ExtendRentResponse,
  GetRentedBooksFromUserResponse,
  RentBookRequest,
  RentBookResponse,
  ReturnRentedBookRequest,
} from '../interfaces/HTTP/Books';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // ALQUILAR LIBRO
  rentBook(data: RentBookRequest): Observable<RentBookResponse> {
    return this.http.post<RentBookResponse>(`${this.BASE_URL}${this.endpoints.rentBook}`, data);
  }

  // LIBROS ALQUILADOS
  getMyRentedBooks(): Observable<GetRentedBooksFromUserResponse> {
    return this.http.get<GetRentedBooksFromUserResponse>(
      `${this.BASE_URL}${this.endpoints.getRentedFromUser}`,
    );
  }

  // CHECK ALQUILER
  checkRent(data: CheckRentedBookRequest): Observable<CheckRentedBookResponse> {
    return this.http.post<CheckRentedBookResponse>(
      `${this.BASE_URL}${this.endpoints.checkRent}`,
      data,
    );
  }

  // EXTENDER ALQUILER
  extendRent(data: ExtendRentRequest): Observable<ExtendRentResponse> {
    return this.http.post<ExtendRentResponse>(`${this.BASE_URL}${this.endpoints.extendRent}`, data);
  }

  // DEVOLVER LIBRO
  returnBook(data: ReturnRentedBookRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}${this.endpoints.returnRentedBook}`, data);
  }
}
