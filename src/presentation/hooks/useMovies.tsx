import { useCallback, useEffect, useRef, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { UseCases } from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';

const usePaginatedList = (
  fetcher: ( page: number ) => Promise<Movie[]>,
) => {
  const [movies, setMovies] = useState<Movie[]>( [] );
  const [isFetching, setIsFetching] = useState( false );
  const pageRef = useRef( 1 );

  const load = async ( page: number ) => {
    if ( isFetching ) return;
    setIsFetching( true );
    const results = await fetcher( page );
    setMovies( prev => page === 1 ? results : [...prev, ...results] );
    setIsFetching( false );
  };

  const fetchNextPage = () => {
    pageRef.current += 1;
    load( pageRef.current );
  };

  const reset = () => {
    pageRef.current = 1;
    setMovies( [] );
    return load( 1 );
  };

  return { movies, isFetching, load, fetchNextPage, reset };
};

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState( true );
  const [isRefreshing, setIsRefreshing] = useState( false );
  const [error, setError] = useState<string | null>( null );

  const nowPlayingList = usePaginatedList( p => UseCases.moviesNowPlayingUseCase( movieDBFetcher, p ) );
  const popularList = usePaginatedList( p => UseCases.moviesPopularUseCase( movieDBFetcher, p ) );
  const topRatedList = usePaginatedList( p => UseCases.moviesTopRatedUseCase( movieDBFetcher, p ) );
  const upcomingList = usePaginatedList( p => UseCases.moviesUpcomingUseCase( movieDBFetcher, p ) );

  const loadAll = useCallback( async ( isRefresh = false ) => {
    setError( null );
    try {
      if ( isRefresh ) {
        await Promise.all( [
          nowPlayingList.reset(),
          popularList.reset(),
          topRatedList.reset(),
          upcomingList.reset(),
        ] );
      } else {
        await Promise.all( [
          nowPlayingList.load( 1 ),
          popularList.load( 1 ),
          topRatedList.load( 1 ),
          upcomingList.load( 1 ),
        ] );
      }
    } catch {
      setError( 'No se pudo cargar el contenido. Verifica tu conexión.' );
    }
  }, [] );

  useEffect( () => {
    loadAll().finally( () => setIsLoading( false ) );
  }, [] );

  const refresh = useCallback( async () => {
    setIsRefreshing( true );
    await loadAll( true );
    setIsRefreshing( false );
  }, [loadAll] );

  return {
    isLoading,
    isRefreshing,
    error,
    refresh,
    nowPlaying: nowPlayingList.movies,
    popular: popularList.movies,
    topRated: topRatedList.movies,
    upcoming: upcomingList.movies,
    fetchNextNowPlaying: nowPlayingList.fetchNextPage,
    fetchNextPopular: popularList.fetchNextPage,
    fetchNextTopRated: topRatedList.fetchNextPage,
    fetchNextUpcoming: upcomingList.fetchNextPage,
  };
};
