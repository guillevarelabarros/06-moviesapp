import { useEffect, useRef, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { UseCases } from '../../core/use-cases';
import { movieDBSearchFetcher } from '../../config/adapters/http/movieDBSearch.adapter';

export const useSearchMovies = () => {
  const [query, setQuery] = useState( '' );
  const [results, setResults] = useState<Movie[]>( [] );
  const [isSearching, setIsSearching] = useState( false );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>( null );

  useEffect( () => {
    if ( debounceRef.current ) clearTimeout( debounceRef.current );

    if ( !query.trim() ) {
      setResults( [] );
      return;
    }

    debounceRef.current = setTimeout( async () => {
      setIsSearching( true );
      const movies = await UseCases.searchMoviesUseCase( movieDBSearchFetcher, query );
      setResults( movies );
      setIsSearching( false );
    }, 400 );

    return () => {
      if ( debounceRef.current ) clearTimeout( debounceRef.current );
    };
  }, [query] );

  return { query, setQuery, results, isSearching };
};
