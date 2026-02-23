import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import { moviesNowPlayingUseCase } from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialLoad = async () => {
      const nowPlayingMovies = await moviesNowPlayingUseCase(movieDBFetcher);
      setNowPlaying(nowPlayingMovies);
      setIsLoading(false);
    };

    initialLoad();
  }, []);

  return { nowPlaying, isLoading };
};
