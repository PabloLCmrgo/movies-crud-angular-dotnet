import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },

  // Movies
  {
    path: 'movies',
    loadComponent: () =>
      import('./components/movies/movie-list/movie-list.component').then(
        (c) => c.MovieListComponent,
      ),
  },
  {
    path: 'movies/new',
    loadComponent: () =>
      import('./components/movies/movie-form/movie-form.component').then(
        (c) => c.MovieFormComponent,
      ),
  },
  {
    path: 'movies/edit/:id',
    loadComponent: () =>
      import('./components/movies/movie-form/movie-form.component').then(
        (c) => c.MovieFormComponent,
      ),
  },

  // Directors
  {
    path: 'directors',
    loadComponent: () =>
      import('./components/directors/director-list/director-list.component').then(
        (c) => c.DirectorListComponent,
      ),
  },
  {
    path: 'directors/new',
    loadComponent: () =>
      import('./components/directors/director-form/director-form.component').then(
        (c) => c.DirectorFormComponent,
      ),
  },
  {
    path: 'directors/edit/:id',
    loadComponent: () =>
      import('./components/directors/director-form/director-form.component').then(
        (c) => c.DirectorFormComponent,
      ),
  },

  // 404
  {
    path: '**',
    redirectTo: 'movies',
  },
];
