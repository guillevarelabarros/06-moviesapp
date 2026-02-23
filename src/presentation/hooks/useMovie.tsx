import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';
import { UseCases } from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';

export const useMovie = ( movieId: number ) => {
  const [movie, setMovie] = useState<Movie | null>( null );
  const [cast, setCast] = useState<Cast[]>( [] );
  const [similarMovies, setSimilarMovies] = useState<Movie[]>( [] );
  const [trailerUrl, setTrailerUrl] = useState<string | null>( null );
  const [isLoading, setIsLoading] = useState( true );
  const [error, setError] = useState<string | null>( null );

  const load = async () => {
    setError( null );
    setIsLoading( true );
    try {
      const [movieDetail, castList, similar, trailer] = await Promise.all( [
        UseCases.getMovieByIdUseCase( movieDBFetcher, movieId ),
        UseCases.getMovieCastUseCase( movieDBFetcher, movieId ),
        UseCases.getSimilarMoviesUseCase( movieDBFetcher, movieId ),
        UseCases.getMovieTrailerUseCase( movieDBFetcher, movieId ),
      ] );
      setMovie( movieDetail );
      setCast( castList );
      setSimilarMovies( similar );
      setTrailerUrl( trailer );
    } catch {
      setError( 'No se pudo cargar la película. Verifica tu conexión.' );
    } finally {
      setIsLoading( false );
    }
  };

  useEffect( () => { load(); }, [movieId] );

  return { movie, cast, similarMovies, trailerUrl, isLoading, error, retry: load };
};
