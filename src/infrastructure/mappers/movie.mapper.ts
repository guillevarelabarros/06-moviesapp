import { Movie } from '../../core/entities/movie.entity';
import { MovieDetailResponse, Result } from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBDetailToEntity( detail: MovieDetailResponse ): Movie {
    return {
      id: detail.id,
      title: detail.title,
      description: detail.overview,
      releaseDate: new Date( detail.release_date ),
      rating: detail.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${ detail.poster_path }`,
      backdrop: `https://image.tmdb.org/t/p/w500${ detail.backdrop_path }`,
      genres: detail.genres.map( g => g.name ),
      runtime: detail.runtime,
      tagline: detail.tagline,
    };
  }

  static fromMovieDBResultToEntity( result: Result ): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date( result.release_date ),
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${ result.poster_path }`,
      backdrop: `https://image.tmdb.org/t/p/w500${ result.backdrop_path }`,
    };
  }
}
