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
  private UPDATE_USER_ENDPOINT = environment.api.endpoints.private.updateUser;


  // LOCAL STORAGE
  storeLocalUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLocalUserData(): any {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  cleanStorage(): void {
    localStorage.removeItem('user');
  }

  // API
  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.post<UpdateUserResponse>(
      this.BASE_URL + this.UPDATE_USER_ENDPOINT,
      data
    );
  }
}