export * from './movies/now-playing.use-cases';
export * from './movies/popular.use-case';
export * from './movies/top-rated.use-case';
export * from './movies/upcoming.use-case';

import { moviesNowPlayingUseCase } from './movies/now-playing.use-cases';
import { moviesPopularUseCase } from './movies/popular.use-case';
import { moviesTopRatedUseCase } from './movies/top-rated.use-case';
import { moviesUpcomingUseCase } from './movies/upcoming.use-case';

export const UseCases = {
  moviesNowPlayingUseCase,
  moviesPopularUseCase,
  moviesTopRatedUseCase,
  moviesUpcomingUseCase,
};