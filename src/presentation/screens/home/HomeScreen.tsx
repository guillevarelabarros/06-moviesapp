import { ScrollView, StyleSheet, View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { MoviesHorizontalList } from '../../components/movies/MoviesHorizontalList';
import { HeroBanner } from '../../components/movies/HeroBanner';
import { HomeSkeleton } from '../../components/movies/HomeSkeleton';

export const HomeScreen = () => {
  const {
    nowPlaying, popular, topRated, upcoming, isLoading,
    fetchNextNowPlaying, fetchNextPopular, fetchNextTopRated, fetchNextUpcoming,
  } = useMovies();

  if ( isLoading ) {
    return <HomeSkeleton />;
  }

  return (
    <ScrollView>
      { nowPlaying[0] && <HeroBanner movie={ nowPlaying[0] } /> }
      <MoviesHorizontalList movies={ nowPlaying } title="En cines" onEndReached={ fetchNextNowPlaying } />
      <MoviesHorizontalList movies={ popular } title="Populares" onEndReached={ fetchNextPopular } />
      <MoviesHorizontalList movies={ topRated } title="Mejor valoradas" onEndReached={ fetchNextTopRated } />
      <MoviesHorizontalList movies={ upcoming } title="Próximamente" onEndReached={ fetchNextUpcoming } />
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} );
