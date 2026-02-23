import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';

const WATCHLIST_KEY = '@movies_watchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>( [] );

  useEffect( () => {
    AsyncStorage.getItem( WATCHLIST_KEY ).then( data => {
      if ( data ) setWatchlist( JSON.parse( data ) );
    } );
  }, [] );

  const save = ( updated: Movie[] ) => {
    setWatchlist( updated );
    AsyncStorage.setItem( WATCHLIST_KEY, JSON.stringify( updated ) );
  };

  const isInWatchlist = useCallback(
    ( movieId: number ) => watchlist.some( m => m.id === movieId ),
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    ( movie: Movie ) => {
      const exists = watchlist.some( m => m.id === movie.id );
      const updated = exists
        ? watchlist.filter( m => m.id !== movie.id )
        : [movie, ...watchlist];
      save( updated );
    },
    [watchlist],
  );

  return { watchlist, isInWatchlist, toggleWatchlist };
};
