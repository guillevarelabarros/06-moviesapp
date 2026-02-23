import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';

const FAVORITES_KEY = '@movies_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>( [] );

  useEffect( () => {
    AsyncStorage.getItem( FAVORITES_KEY ).then( data => {
      if ( data ) setFavorites( JSON.parse( data ) );
    } );
  }, [] );

  const save = ( updated: Movie[] ) => {
    setFavorites( updated );
    AsyncStorage.setItem( FAVORITES_KEY, JSON.stringify( updated ) );
  };

  const isFavorite = useCallback(
    ( movieId: number ) => favorites.some( f => f.id === movieId ),
    [favorites],
  );

  const toggleFavorite = useCallback(
    ( movie: Movie ) => {
      const exists = favorites.some( f => f.id === movie.id );
      const updated = exists
        ? favorites.filter( f => f.id !== movie.id )
        : [movie, ...favorites];
      save( updated );
    },
    [favorites],
  );

  return { favorites, isFavorite, toggleFavorite };
};
