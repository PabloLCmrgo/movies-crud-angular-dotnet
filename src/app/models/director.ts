export interface Director {
  id: number;
  name: string;
  nationality: string;
  age?: number;
  active: boolean;
}

export type DirectorInput = Omit<Director, 'id'>;
