import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';

const API_URL = environment.apiURL;
@Injectable()
export class UserService {


  currentUser: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return localStorage.getItem('_id') != undefined;
  }

  constructor(private http: HttpClient) { }


  register(data: {email: string; password: string }) {
    return this.http.post<IUser>(`${API_URL}/users/register`, data, { withCredentials: true }).pipe(
      tap((user) => this.currentUser = user)
    );
  };

  login(data: { email: string; password: string }) {
    return this.http.post<IUser>(`${API_URL}/users/login`, data, { withCredentials: true }).pipe(
      tap((user) => this.currentUser = user)
    );
  };

  logout() {
    return this.http.get<IUser>(`${API_URL}/users/logout`, { withCredentials: true }).pipe(
      tap(() => this.currentUser = undefined)
    );
  };

  getUserById(id: string){
    return this.http.get<IUser>(`${API_URL}/users/profile/${id}`, { withCredentials: true });
  }



}

