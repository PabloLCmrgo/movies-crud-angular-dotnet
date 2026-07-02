import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie, MovieInput, MovieWithDirector } from '../models/movie';
import { DirectorService } from './director.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly directorService = inject(DirectorService);
  private readonly baseUrl = `${environment.apiUrl}/movies`;

  // TODO: mock data mientras no hay backend disponible. Quitar al conectar la API real.
  private mockMovies: Movie[] = [
    { id: 1, name: 'Inception', releaseYear: '2010-07-16', genre: 'Ciencia ficción', duration: '02:28:00', directorId: 1 },
    { id: 2, name: 'Barbie', releaseYear: '2023-07-21', genre: 'Comedia', duration: '01:54:00', directorId: 2 },
    { id: 3, name: 'El viaje de Chihiro', releaseYear: '2001-07-20', genre: 'Fantasía', duration: '02:04:00', directorId: 3 },
    { id: 4, name: 'Interstellar', releaseYear: '2014-11-07', genre: 'Ciencia ficción', duration: '02:49:00', directorId: 1 }
  ];
  private nextId = 5;

  getAll(): Observable<MovieWithDirector[]> {
    // return this.http.get<MovieWithDirector[]>(this.baseUrl);
    return this.directorService.getAll().pipe(
      map(directors => this.mockMovies.map(movie => ({
        ...movie,
        directorName: directors.find(d => d.id === movie.directorId)?.name ?? 'Desconocido'
      })))
    );
  }

  getById(id: number): Observable<Movie> {
    // return this.http.get<Movie>(`${this.baseUrl}/${id}`);
    return of(this.mockMovies.find(m => m.id === id)!);
  }

  create(movie: MovieInput): Observable<Movie> {
    // return this.http.post<Movie>(this.baseUrl, movie);
    const newMovie: Movie = { ...movie, id: this.nextId++ };
    this.mockMovies.push(newMovie);
    return of(newMovie);
  }

  update(id: number, movie: MovieInput): Observable<Movie> {
    // return this.http.put<Movie>(`${this.baseUrl}/${id}`, movie);
    const index = this.mockMovies.findIndex(m => m.id === id);
    const updated: Movie = { ...movie, id };
    if (index !== -1) this.mockMovies[index] = updated;
    return of(updated);
  }

  delete(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.baseUrl}/${id}`);
    this.mockMovies = this.mockMovies.filter(m => m.id !== id);
    return of(undefined);
  }
}
