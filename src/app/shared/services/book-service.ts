import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import {
  UploadBookRequest,
  DeleteBookRequest,
  GetAllBooksFromUserResponse,
  GetAllBooksResponse,
  GetAllBooksFromCategoryRequest,
  GetAllBooksFromCategoryResponse,
  GetBookDetailsRequest,
  GetBookDetailsResponse
} from '../interfaces/Book/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints;

  // SUBIR LIBRO
  uploadBook(data: UploadBookRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.endpoints.private.uploadBook}`,
      data
    );
  }

  // BORRAR LIBRO
  deleteBook(data: DeleteBookRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.endpoints.private.deleteBook}`,
      data
    );
  }

  // LIBROS USUARIO
  getAllBooksFromUser(): Observable<GetAllBooksFromUserResponse> {
    return this.http.get<GetAllBooksFromUserResponse>(
      `${this.BASE_URL}${this.endpoints.private.getAllBooksFromUser}`
    );
  }

  // TODOS LOS LIBROS
  getAllBooks(): Observable<GetAllBooksResponse> {
    return this.http.get<GetAllBooksResponse>(
      `${this.BASE_URL}${this.endpoints.public.getAllBooks}`
    );
  }

  // LIBROS POR CATEGORÍA
  getBooksFromCategory(
    data: GetAllBooksFromCategoryRequest
  ): Observable<GetAllBooksFromCategoryResponse> {
    return this.http.post<GetAllBooksFromCategoryResponse>(
      `${this.BASE_URL}${this.endpoints.public.getBooksFromCategory}`,
      data
    );
  }

  // DETALLE LIBRO
  getBookDetails(
    data: GetBookDetailsRequest
  ): Observable<GetBookDetailsResponse> {
    return this.http.post<GetBookDetailsResponse>(
      `${this.BASE_URL}${this.endpoints.public.getBookDetails}`,
      data
    );
  }
}