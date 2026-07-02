import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieWithDirector } from '../../../models/movie';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './movie-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  readonly movies = signal<MovieWithDirector[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.movieService.getAll().subscribe({
      next: data => {
        this.movies.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de películas.');
        this.loading.set(false);
      }
    });
  }

  remove(id: number): void {
    if (!confirm('¿Eliminar esta película?')) return;
    this.movieService.delete(id).subscribe({
      next: () => this.movies.update(list => list.filter(m => m.id !== id)),
      error: () => this.error.set('No se pudo eliminar la película.')
    });
  }
}
