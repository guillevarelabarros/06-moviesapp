import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entity';

export const getSimilarMoviesUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Movie[]> => {
  try {
    const { results } = await fetcher.get<MovieDBMoviesResponse>( `/${ movieId }/similar` );
    return results.map( MovieMapper.fromMovieDBResultToEntity );
  } catch {
    throw new Error( 'Error fetching similar movies' );
  }
};
