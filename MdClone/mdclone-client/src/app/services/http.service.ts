import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get<T>(endpoint: string): Observable<T> {
    const headers = this.buildHeaders();
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.buildHeaders();
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.buildHeaders();
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.buildHeaders();
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
