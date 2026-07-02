import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Director, DirectorInput } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/directors`;

  getAll(): Observable<Director[]> {
    return this.http.get<Director[]>(this.baseUrl);
  }

  getById(id: number): Observable<Director> {
    return this.http.get<Director>(`${this.baseUrl}/${id}`);
  }

  create(director: DirectorInput): Observable<Director> {
    return this.http.post<Director>(this.baseUrl, director);
  }

  update(id: number, director: DirectorInput): Observable<Director> {
    return this.http.put<Director>(`${this.baseUrl}/${id}`, director);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
