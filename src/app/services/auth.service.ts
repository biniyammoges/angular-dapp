import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AppError } from '../errors/app-error';
import { BadRequestError } from '../errors/bad-request';
import { UnAuthorizedError } from '../errors/unauthorized-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';
  currentUser = this.userFromStorage();

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.url}/api/v1/auth/signin`, user).pipe(
      map((res) => this.saveAndStore(res)),
      catchError((error: Response) => {
        if (error.status === 400)
          return throwError(() => new BadRequestError(error));

        return throwError(() => new AppError(error));
      })
    );
  }

  getLoggedInUser() {
    const token = this.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const options = { headers };

    return this.http.get(`${this.url}/api/v1/auth/user/me`, options).pipe(
      map((res) => {
        this.currentUser = res;
        localStorage.setItem('currentUser', JSON.stringify(res));
      }),
      catchError((error: Response) => {
        if (error.status === 401) {
          this.logout();
          window.location.reload();
          return throwError(() => new UnAuthorizedError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return token;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  private saveAndStore(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUser = response.user;
  }

  private userFromStorage() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) return JSON.parse(currentUser);
    return null;
  }
}
