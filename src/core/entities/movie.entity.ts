export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;
  // Detail fields (optional)
  genres?: string[];
  runtime?: number;
  tagline?: string;
}
