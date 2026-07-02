export interface Movie {
  id: number;
  name: string;
  releaseYear: string;
  genre: string;
  duration: string;
  directorId: number;
}

export type MovieInput = Omit<Movie, 'id'>;

export interface MovieWithDirector extends Movie {
  directorName: string;
}
