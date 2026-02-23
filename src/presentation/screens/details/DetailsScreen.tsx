import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { CastHorizontalList } from '../../components/movies/CastHorizontalList';
import { MoviesHorizontalList } from '../../components/movies/MoviesHorizontalList';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useWatchlistContext } from '../../context/WatchlistContext';
import { useHistoryContext } from '../../context/HistoryContext';
import { useTheme } from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ( { route, navigation }: Props ) => {
  const { movieId } = route.params;
  const { movie, cast, similarMovies, trailerUrl, isLoading, error, retry } = useMovie( movieId );
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();
  const { addToHistory } = useHistoryContext();
  const { colors } = useTheme();
  const fav = movie ? isFavorite( movie.id ) : false;
  const inWatchlist = movie ? isInWatchlist( movie.id ) : false;

  const handleShare = () => {
    if ( !movie ) return;
    Share.share( {
      title: movie.title,
      message: `¡Mira "${ movie.title }"! https://www.themoviedb.org/movie/${ movie.id }`,
    } );
  };

  useEffect( () => {
    if ( movie ) addToHistory( movie );
  }, [movie] );

  return (
    <View style={ [styles.container, { backgroundColor: colors.background }] }>
      {/* Back button */ }
      <Pressable onPress={ () => navigation.goBack() } style={ styles.backButton }>
        <Text style={ styles.backText }>← Volver</Text>
      </Pressable>

      { movie && (
        <>
          <Pressable onPress={ () => toggleFavorite( movie ) } style={ styles.heartButton }>
            <Text style={ styles.heartText }>{ fav ? '❤️' : '🤍' }</Text>
          </Pressable>
          <Pressable onPress={ () => toggleWatchlist( movie ) } style={ styles.watchlistButton }>
            <Text style={ styles.heartText }>{ inWatchlist ? '🕕' : '🕐' }</Text>
          </Pressable>
          <Pressable onPress={ handleShare } style={ styles.shareButton }>
            <Text style={ styles.heartText }>🔗</Text>
          </Pressable>
        </>
      ) }

      { isLoading ? (
        <ActivityIndicator size={ 60 } color="red" style={ styles.loader } />
      ) : error ? (
        <View style={ styles.errorContainer }>
          <Text style={ styles.errorIcon }>⚠️</Text>
          <Text style={ [styles.errorText, { color: colors.text }] }>{ error }</Text>
          <Pressable style={ styles.retryBtn } onPress={ retry }>
            <Text style={ styles.retryText }>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView>
          { /* Backdrop */ }
          <Image
            source={ { uri: movie?.backdrop } }
            style={ styles.backdrop }
            resizeMode="cover"
          />

          <View style={ styles.content }>
            { /* Poster + title */ }
            <View style={ styles.header }>
              <Image
                source={ { uri: movie?.poster } }
                style={ styles.poster }
                resizeMode="cover"
              />
              <View style={ styles.headerInfo }>
                <Text style={ [styles.title, { color: colors.text }] }>{ movie?.title }</Text>
                { movie?.tagline ? (
                  <Text style={ [styles.tagline, { color: colors.subtext }] }>{ movie.tagline }</Text>
                ) : null }
                <Text style={ [styles.rating, { color: colors.text }] }>⭐ { movie?.rating.toFixed( 1 ) } / 10</Text>
                { movie?.runtime ? (
                  <Text style={ [styles.meta, { color: colors.subtext }] }>🕒 { movie.runtime } min</Text>
                ) : null }
                <Text style={ [styles.meta, { color: colors.subtext }] }>
                  📅 { movie?.releaseDate.getFullYear() }
                </Text>
                { trailerUrl && (
                  <Pressable
                    style={ styles.trailerBtn }
                    onPress={ () => Linking.openURL( trailerUrl ) }
                  >
                    <Text style={ styles.trailerText }>▶ Ver tráiler</Text>
                  </Pressable>
                ) }
              </View>
            </View>

            { /* Genres */ }
            { movie?.genres && movie.genres.length > 0 && (
              <View style={ styles.genresContainer }>
                { movie.genres.map( genre => (
                  <View key={ genre } style={ [styles.genre, { backgroundColor: colors.genreBg }] }>
                    <Text style={ [styles.genreText, { color: colors.genreText }] }>{ genre }</Text>
                  </View>
                ) ) }
              </View>
            ) }

            { /* Description */ }
            <Text style={ [styles.descriptionTitle, { color: colors.text }] }>Sinopsis</Text>
            <Text style={ [styles.description, { color: colors.subtext }] }>{ movie?.description }</Text>
          </View>

          { /* Cast */ }
          <CastHorizontalList cast={ cast } />

          { /* Similar movies */ }
          { similarMovies.length > 0 && (
            <MoviesHorizontalList movies={ similarMovies } title="Películas similares" />
          ) }
        </ScrollView>
      ) }
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    marginTop: 200,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  watchlistButton: {
    position: 'absolute',
    top: 40,
    right: 72,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  shareButton: {
    position: 'absolute',
    top: 40,
    right: 128,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heartText: {
    fontSize: 20,
  },
  backdrop: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 12,
    marginTop: -50,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  headerInfo: {
    flex: 1,
    paddingTop: 8,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
  },
  trailerBtn: {
    backgroundColor: '#e50914',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  trailerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genre: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 13,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
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
