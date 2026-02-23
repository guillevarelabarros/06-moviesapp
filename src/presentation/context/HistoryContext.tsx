import { createContext, useContext } from 'react';
import { Movie } from '../../core/entities/movie.entity';

interface HistoryContextType {
  history: Movie[];
  addToHistory: ( movie: Movie ) => void;
  clearHistory: () => void;
}

export const HistoryContext = createContext<HistoryContextType>( {
  history: [],
  addToHistory: () => {},
  clearHistory: () => {},
} );

export const useHistoryContext = () => useContext( HistoryContext );
