import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entity';

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
  page: number = 1,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<MovieDBMoviesResponse>( '/popular', { params: { page } } );
    return popular.results.map( result =>
      MovieMapper.fromMovieDBResultToEntity( result ),
    );
  } catch {
    throw new Error( 'Error fetching movies - PopularUseCase' );
  }
};
