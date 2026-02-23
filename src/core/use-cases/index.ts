export * from './movies/now-playing.use-cases';
export * from './movies/popular.use-case';
export * from './movies/top-rated.use-case';
export * from './movies/upcoming.use-case';
export * from './movies/get-movie-by-id.use-case';
export * from './movies/get-movie-cast.use-case';
export * from './movies/get-similar-movies.use-case';

import { moviesNowPlayingUseCase } from './movies/now-playing.use-cases';
import { moviesPopularUseCase } from './movies/popular.use-case';
import { moviesTopRatedUseCase } from './movies/top-rated.use-case';
import { moviesUpcomingUseCase } from './movies/upcoming.use-case';
import { getMovieByIdUseCase } from './movies/get-movie-by-id.use-case';
import { getMovieCastUseCase } from './movies/get-movie-cast.use-case';
import { getSimilarMoviesUseCase } from './movies/get-similar-movies.use-case';

export const UseCases = {
  moviesNowPlayingUseCase,
  moviesPopularUseCase,
  moviesTopRatedUseCase,
  moviesUpcomingUseCase,
  getMovieByIdUseCase,
  getMovieCastUseCase,
  getSimilarMoviesUseCase,
};