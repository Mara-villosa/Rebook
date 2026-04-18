import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UpdateUserRequest, UpdateUserResponse } from '../../interfaces/HTTP/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // ACTUALIZAR USUARIO
  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.post<UpdateUserResponse>(`${this.BASE_URL}${this.endpoints.updateUser}`, data);
  }
}
