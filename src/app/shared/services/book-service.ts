import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  UploadBookRequest,
  DeleteBookRequest,
  GetAllBooksFromUserResponse
} from '../interfaces/Book/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;

  // SUBIR LIBRO
  uploadBook(data: UploadBookRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}?endpoint=${environment.api.endpoints.private.uploadBook}`,
      data
    );
  }

  // BORRAR LIBRO
  deleteBook(data: DeleteBookRequest): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}?endpoint=${environment.api.endpoints.private.deleteBook}`,
      data
    );
  }

  // LIBROS DEL USUARIO 
  getAllBooksFromUser(): Observable<GetAllBooksFromUserResponse> {
    return this.http.get<GetAllBooksFromUserResponse>(
      `${this.BASE_URL}?endpoint=${environment.api.endpoints.private.getAllBooksFromUser.replace('/', '')}`
    );
  }
}