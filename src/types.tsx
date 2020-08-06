export interface Film {
  id: number;
  title: string;
  genre: string;
  releaseDate: number;
  runtime: number;
  poster: string;
  posterInfo: string;
  background: string;
  backgroundColor: string;
  preview: string;
  video: string;
  rating: {
    score: number;
    count: number;
  };
  text: string;
  director: string;
  actors: Array<string>;
  isFavorite: boolean;
}

export interface AuthData {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface ReviewData {
  rating: number;
  comment: string;
}

export interface ReviewInterface {
  id: number;
  user: {
    id: number;
    name: string;
  };
  comment: string;
  date: string;
  rating: number;
}
