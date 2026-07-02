import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorService } from '../../../services/director.service';
import { DirectorInput } from '../../../models/director';

@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './director-form.component.html',
  styleUrl: './director-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectorFormComponent implements OnInit {
  private readonly directorService = inject(DirectorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  private directorId: number | null = null;
  readonly isEdit = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    nationality: ['', Validators.required],
    age: this.fb.control<number | null>(null, [Validators.min(0), Validators.max(130)]),
    active: [true]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.directorId = +id;
      this.isEdit.set(true);
      this.directorService.getById(this.directorId).subscribe({
        next: director => this.form.patchValue(director),
        error: () => this.error.set('No se pudo cargar el director.')
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
    const payload: DirectorInput = { ...raw, age: raw.age ?? undefined };
    const request = this.isEdit() && this.directorId !== null
      ? this.directorService.update(this.directorId, payload)
      : this.directorService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/directors']),
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo guardar el director.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/directors']);
  }
}
