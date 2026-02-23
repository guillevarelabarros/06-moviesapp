import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDetailResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Movie> => {
  try {
    const movie = await fetcher.get<MovieDetailResponse>( `/${ movieId }` );
    return MovieMapper.fromMovieDBDetailToEntity( movie );
  } catch {
    throw new Error( 'Error fetching movie detail' );
  }
};
