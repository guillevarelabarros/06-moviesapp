import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { NowPlayingResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entity';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
  page: number = 1,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>( '/now_playing', { params: { page } } );
    return nowPlaying.results.map( result =>
      MovieMapper.fromMovieDBResultToEntity( result ),
    );
  } catch {
    throw new Error( 'Error fetching movies - NowPlaying' );
  }
};
