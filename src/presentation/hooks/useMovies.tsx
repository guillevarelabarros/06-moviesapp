import { useEffect, useRef, useState } from 'react';
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

  return { movies, isFetching, load, fetchNextPage };
};

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState( true );

  const nowPlayingList = usePaginatedList( p => UseCases.moviesNowPlayingUseCase( movieDBFetcher, p ) );
  const popularList = usePaginatedList( p => UseCases.moviesPopularUseCase( movieDBFetcher, p ) );
  const topRatedList = usePaginatedList( p => UseCases.moviesTopRatedUseCase( movieDBFetcher, p ) );
  const upcomingList = usePaginatedList( p => UseCases.moviesUpcomingUseCase( movieDBFetcher, p ) );

  useEffect( () => {
    Promise.all( [
      nowPlayingList.load( 1 ),
      popularList.load( 1 ),
      topRatedList.load( 1 ),
      upcomingList.load( 1 ),
    ] ).finally( () => setIsLoading( false ) );
  }, [] );

  return {
    isLoading,
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
