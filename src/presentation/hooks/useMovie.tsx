import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';
import { UseCases } from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';

export const useMovie = ( movieId: number ) => {
  const [movie, setMovie] = useState<Movie | null>( null );
  const [cast, setCast] = useState<Cast[]>( [] );
  const [similarMovies, setSimilarMovies] = useState<Movie[]>( [] );
  const [isLoading, setIsLoading] = useState( true );

  useEffect( () => {
    Promise.all( [
      UseCases.getMovieByIdUseCase( movieDBFetcher, movieId ),
      UseCases.getMovieCastUseCase( movieDBFetcher, movieId ),
      UseCases.getSimilarMoviesUseCase( movieDBFetcher, movieId ),
    ] )
      .then( ( [movieDetail, castList, similar] ) => {
        setMovie( movieDetail );
        setCast( castList );
        setSimilarMovies( similar );
      } )
      .finally( () => setIsLoading( false ) );
  }, [movieId] );

  return { movie, cast, similarMovies, isLoading };
};
