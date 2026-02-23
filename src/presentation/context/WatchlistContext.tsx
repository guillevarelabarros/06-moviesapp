import { createContext, useContext } from 'react';
import { Movie } from '../../core/entities/movie.entity';

interface WatchlistContextType {
  watchlist: Movie[];
  isInWatchlist: ( movieId: number ) => boolean;
  toggleWatchlist: ( movie: Movie ) => void;
}

export const WatchlistContext = createContext<WatchlistContextType>( {
  watchlist: [],
  isInWatchlist: () => false,
  toggleWatchlist: () => {},
} );

export const useWatchlistContext = () => useContext( WatchlistContext );
