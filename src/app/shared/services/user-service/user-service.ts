import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UpdateUserRequest } from '../../interfaces/User/UpdateUser';
import { UpdateUserResponse } from '../../interfaces/User/update-user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);

  private BASE_URL = environment.api.url;
  private endpoints = environment.api.endpoints.private;

  // ACTUALIZAR USUARIO
  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.post<UpdateUserResponse>(
      `${this.BASE_URL}${this.endpoints.updateUser}`,
      data
    );
  }
}