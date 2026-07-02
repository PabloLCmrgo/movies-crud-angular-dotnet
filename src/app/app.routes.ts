import { Routes } from '@angular/router';

import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movies/movie-form/movie-form.component';

import { DirectorListComponent } from './components/directors/director-list/director-list.component';
import { DirectorFormComponent } from './components/directors/director-form/director-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },

  {
    path: 'movies',
    component: MovieListComponent,
  },

  {
    path: 'movies/new',
    component: MovieFormComponent,
  },

  {
    path: 'movies/edit/:id',
    component: MovieFormComponent,
  },

  {
    path: 'directors',
    component: DirectorListComponent,
  },

  {
    path: 'directors/new',
    component: DirectorFormComponent,
  },

  {
    path: 'directors/edit/:id',
    component: DirectorFormComponent,
  },

  {
    path: '**',
    redirectTo: 'movies',
  },
];