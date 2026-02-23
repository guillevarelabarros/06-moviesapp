import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { MoviesHorizontalList } from '../../components/movies/MoviesHorizontalList';
import { HeroCarousel } from '../../components/movies/HeroCarousel';
import { HomeSkeleton } from '../../components/movies/HomeSkeleton';
import { useHistoryContext } from '../../context/HistoryContext';
import { useTheme } from '../../context/ThemeContext';

export const HomeScreen = () => {
  const {
    nowPlaying, popular, topRated, upcoming, isLoading, isRefreshing, error, refresh,
    fetchNextNowPlaying, fetchNextPopular, fetchNextTopRated, fetchNextUpcoming,
  } = useMovies();
  const { history } = useHistoryContext();
  const { colors } = useTheme();

  if ( isLoading ) {
    return <HomeSkeleton />;
  }

  if ( error ) {
    return (
      <View style={ [styles.errorContainer, { backgroundColor: colors.background }] }>
        <Text style={ styles.errorIcon }>⚠️</Text>
        <Text style={ [styles.errorText, { color: colors.text }] }>{ error }</Text>
        <Pressable style={ styles.retryBtn } onPress={ refresh }>
          <Text style={ styles.retryText }>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={ { backgroundColor: colors.background } }
      refreshControl={
        <RefreshControl
          refreshing={ isRefreshing }
          onRefresh={ refresh }
          tintColor="#e50914"
          colors={ ['#e50914'] }
        />
      }
    >
      { nowPlaying.length > 0 && <HeroCarousel movies={ nowPlaying } /> }
      { history.length > 0 && (
        <MoviesHorizontalList movies={ history } title="Vistos recientemente" />
      ) }
      <MoviesHorizontalList movies={ nowPlaying } title="En cines" onEndReached={ fetchNextNowPlaying } />
      <MoviesHorizontalList movies={ popular } title="Populares" onEndReached={ fetchNextPopular } />
      <MoviesHorizontalList movies={ topRated } title="Mejor valoradas" onEndReached={ fetchNextTopRated } />
      <MoviesHorizontalList movies={ upcoming } title="Próximamente" onEndReached={ fetchNextUpcoming } />
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 32,
  },
  errorIcon: {
    fontSize: 48,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
} );
