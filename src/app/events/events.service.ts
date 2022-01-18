import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, throttleTime, throwError } from 'rxjs';
import { UnAuthorizedError } from '../errors/unauthorized-error';
import { AppError } from '../errors/app-error';
import { ForbiddenError } from '../errors/forbidden-error';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(keyword?: string) {
    if (keyword)
      return this.http.get(`${this.url}/api/v1/events?keyword=${keyword}`);

    return this.http.get(`${this.url}/api/v1/events`);
  }

  getOne(id: string) {
    return this.http.get(`${this.url}/api/v1/events/${id}`);
  }

  getMyEvents() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const options = { headers };

    return this.http.get(`${this.url}/api/v1/events/me`, options).pipe(
      catchError((error: Response) => {
        if (error.status === 401) {
          this.authService.logout();
          window.location.reload();
          return throwError(() => new UnAuthorizedError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }

  createEvent(event: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const options = { headers };

    return this.http.post(`${this.url}/api/v1/events`, event, options).pipe(
      catchError((error: Response) => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logout();
          window.location.reload();
          return throwError(() => new UnAuthorizedError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }

  updateEvent(id: string, event: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const options = { headers };

    return this.http
      .put(`${this.url}/api/v1/events/${id}`, event, options)
      .pipe(
        catchError((error: Response) => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            window.location.reload();
            return throwError(() => new UnAuthorizedError(error));
          } else if (error.status === 403)
            return throwError(() => new ForbiddenError());

          return throwError(() => new AppError(error));
        })
      );
  }
}
