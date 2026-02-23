import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';

const HISTORY_KEY = '@movies_history';
const MAX_HISTORY = 20;

export const useHistory = () => {
  const [history, setHistory] = useState<Movie[]>( [] );

  useEffect( () => {
    AsyncStorage.getItem( HISTORY_KEY ).then( data => {
      if ( data ) setHistory( JSON.parse( data ) );
    } );
  }, [] );

  const addToHistory = useCallback( ( movie: Movie ) => {
    setHistory( prev => {
      const filtered = prev.filter( m => m.id !== movie.id );
      const updated = [movie, ...filtered].slice( 0, MAX_HISTORY );
      AsyncStorage.setItem( HISTORY_KEY, JSON.stringify( updated ) );
      return updated;
    } );
  }, [] );

  const clearHistory = useCallback( () => {
    setHistory( [] );
    AsyncStorage.removeItem( HISTORY_KEY );
  }, [] );

  return { history, addToHistory, clearHistory };
};
