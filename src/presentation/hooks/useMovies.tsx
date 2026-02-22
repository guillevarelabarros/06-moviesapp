import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { UseCases } from '../../core/use-cases/movies';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialLoad = async () => {
      const nowPlayingMovies = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
      setNowPlaying(nowPlayingMovies);
      setIsLoading(false);
    };

    initialLoad();
  }, []);

  return { nowPlaying, isLoading };
};
