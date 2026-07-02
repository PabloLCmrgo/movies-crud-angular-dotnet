import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie, MovieInput, MovieWithDirector } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/movies`;

  getAll(): Observable<MovieWithDirector[]> {
    return this.http.get<MovieWithDirector[]>(this.baseUrl);
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  create(movie: MovieInput): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie);
  }

  update(id: number, movie: MovieInput): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, movie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
