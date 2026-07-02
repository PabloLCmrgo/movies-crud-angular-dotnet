import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Director, DirectorInput } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/directors`;

  // TODO: mock data mientras no hay backend disponible. Quitar al conectar la API real.
  private mockDirectors: Director[] = [
    { id: 1, name: 'Christopher Nolan', nationality: 'Reino Unido', age: 54, active: true },
    { id: 2, name: 'Greta Gerwig', nationality: 'Estados Unidos', age: 41, active: true },
    { id: 3, name: 'Hayao Miyazaki', nationality: 'Japón', age: 84, active: false }
  ];
  private nextId = 4;

  getAll(): Observable<Director[]> {
    // return this.http.get<Director[]>(this.baseUrl);
    return of(this.mockDirectors);
  }

  getById(id: number): Observable<Director> {
    // return this.http.get<Director>(`${this.baseUrl}/${id}`);
    return of(this.mockDirectors.find(d => d.id === id)!);
  }

  create(director: DirectorInput): Observable<Director> {
    // return this.http.post<Director>(this.baseUrl, director);
    const newDirector: Director = { ...director, id: this.nextId++ };
    this.mockDirectors.push(newDirector);
    return of(newDirector);
  }

  update(id: number, director: DirectorInput): Observable<Director> {
    // return this.http.put<Director>(`${this.baseUrl}/${id}`, director);
    const index = this.mockDirectors.findIndex(d => d.id === id);
    const updated: Director = { ...director, id };
    if (index !== -1) this.mockDirectors[index] = updated;
    return of(updated);
  }

  delete(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.baseUrl}/${id}`);
    this.mockDirectors = this.mockDirectors.filter(d => d.id !== id);
    return of(undefined);
  }
}
