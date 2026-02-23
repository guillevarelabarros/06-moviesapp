import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieVideosResponse } from '../../../infrastructure/interfaces/movie-db.responses';

export const getMovieTrailerUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<string | null> => {
  try {
    const { results } = await fetcher.get<MovieVideosResponse>( `/${ movieId }/videos` );
    const trailer = results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube',
    ) ?? results.find( v => v.site === 'YouTube' );
    return trailer ? `https://www.youtube.com/watch?v=${ trailer.key }` : null;
  } catch {
    return null;
  }
};
