import { useEffect, useRef, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { UseCases } from '../../core/use-cases';
import { movieDBSearchFetcher } from '../../config/adapters/http/movieDBSearch.adapter';

export const useSearchMovies = () => {
  const [query, setQuery] = useState( '' );
  const [results, setResults] = useState<Movie[]>( [] );
  const [isSearching, setIsSearching] = useState( false );
  const [page, setPage] = useState( 1 );
  const [hasMore, setHasMore] = useState( true );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>( null );

  const doSearch = async ( q: string, p: number, append: boolean ) => {
    setIsSearching( true );
    try {
      const movies = await UseCases.searchMoviesUseCase( movieDBSearchFetcher, q, p );
      setResults( prev => append ? [...prev, ...movies] : movies );
      setHasMore( movies.length >= 20 );
    } catch {
      // keep existing results on error
    } finally {
      setIsSearching( false );
    }
  };

  useEffect( () => {
    if ( debounceRef.current ) clearTimeout( debounceRef.current );

    if ( !query.trim() ) {
      setResults( [] );
      setPage( 1 );
      setHasMore( true );
      return;
    }

    setPage( 1 );
    debounceRef.current = setTimeout( () => doSearch( query, 1, false ), 400 );

    return () => {
      if ( debounceRef.current ) clearTimeout( debounceRef.current );
    };
  }, [query] );

  const fetchNextPage = () => {
    if ( isSearching || !hasMore || !query.trim() ) return;
    const next = page + 1;
    setPage( next );
    doSearch( query, next, true );
  };

  return { query, setQuery, results, isSearching, fetchNextPage };
};
