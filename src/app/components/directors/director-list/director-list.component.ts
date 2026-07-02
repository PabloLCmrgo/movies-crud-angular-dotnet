import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Director } from '../../../models/director';
import { DirectorService } from '../../../services/director.service';

@Component({
  selector: 'app-director-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './director-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectorListComponent implements OnInit {
  private readonly directorService = inject(DirectorService);

  readonly directors = signal<Director[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.directorService.getAll().subscribe({
      next: data => {
        this.directors.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de directores.');
        this.loading.set(false);
      }
    });
  }

  remove(id: number): void {
    if (!confirm('¿Eliminar este director? También se eliminarán sus películas asociadas.')) return;
    this.directorService.delete(id).subscribe({
      next: () => this.directors.update(list => list.filter(d => d.id !== id)),
      error: () => this.error.set('No se pudo eliminar el director.')
    });
  }
}
