import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieCreditsResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { Cast } from '../../entities/cast.entity';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const { cast } = await fetcher.get<MovieCreditsResponse>( `/${ movieId }/credits` );
    return cast
      .slice( 0, 20 )
      .map( member => ( {
        id: member.id,
        name: member.name,
        character: member.character,
        profilePath: member.profile_path
          ? `https://image.tmdb.org/t/p/w185${ member.profile_path }`
          : undefined,
      } ) );
  } catch {
    throw new Error( 'Error fetching movie cast' );
  }
};
