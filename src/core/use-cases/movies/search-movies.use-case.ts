import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entity';

export const searchMoviesUseCase = async (
  fetcher: HttpAdapter,
  query: string,
  page: number = 1,
): Promise<Movie[]> => {
  try {
    if ( !query.trim() ) return [];
    const response = await fetcher.get<MovieDBMoviesResponse>( '/movie', {
      params: { query, page },
    } );
    return response.results.map( MovieMapper.fromMovieDBResultToEntity );
  } catch {
    throw new Error( 'Error searching movies' );
  }
};
