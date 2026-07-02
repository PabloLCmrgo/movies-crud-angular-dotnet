import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { DirectorService } from '../../../services/director.service';
import { MovieInput } from '../../../models/movie';
import { Director } from '../../../models/director';

const DURATION_PATTERN = /^\d{2}:\d{2}:\d{2}$/;

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieFormComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly directorService = inject(DirectorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  private movieId: number | null = null;
  readonly isEdit = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly directors = signal<Director[]>([]);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    releaseYear: ['', Validators.required],
    genre: ['', Validators.required],
    duration: ['', [Validators.required, Validators.pattern(DURATION_PATTERN)]],
    directorId: this.fb.control<number | null>(null, Validators.required)
  });

  ngOnInit(): void {
    this.directorService.getAll().subscribe({
      next: directors => this.directors.set(directors),
      error: () => this.error.set('No se pudieron cargar los directores.')
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = +id;
      this.isEdit.set(true);
      this.movieService.getById(this.movieId).subscribe({
        next: movie => this.form.patchValue({
          ...movie,
          releaseYear: movie.releaseYear.substring(0, 10)
        }),
        error: () => this.error.set('No se pudo cargar la película.')
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const raw = this.form.getRawValue();
    const payload: MovieInput = { ...raw, directorId: raw.directorId! };
    const request = this.isEdit() && this.movieId !== null
      ? this.movieService.update(this.movieId, payload)
      : this.movieService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/movies']),
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo guardar la película.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
