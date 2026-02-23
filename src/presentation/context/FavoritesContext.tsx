import { createContext, useContext } from 'react';
import { Movie } from '../../core/entities/movie.entity';

interface FavoritesContextType {
  favorites: Movie[];
  isFavorite: ( movieId: number ) => boolean;
  toggleFavorite: ( movie: Movie ) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>( {
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
} );

export const useFavoritesContext = () => useContext( FavoritesContext );
