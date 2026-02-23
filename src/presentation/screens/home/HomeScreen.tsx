import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { MoviesHorizontalList } from '../../components/movies/MoviesHorizontalList';
import { HeroBanner } from '../../components/movies/HeroBanner';

export const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();

  if ( isLoading ) {
    return (
      <View style={ styles.loader }>
        <ActivityIndicator size={ 60 } color="red" />
      </View>
    );
  }

  return (
    <ScrollView>
      { nowPlaying[0] && <HeroBanner movie={ nowPlaying[0] } /> }
      <MoviesHorizontalList movies={ nowPlaying } title="En cines" />
      <MoviesHorizontalList movies={ popular } title="Populares" />
      <MoviesHorizontalList movies={ topRated } title="Mejor valoradas" />
      <MoviesHorizontalList movies={ upcoming } title="Próximamente" />
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
