import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { CastHorizontalList } from '../../components/movies/CastHorizontalList';
import { MoviesHorizontalList } from '../../components/movies/MoviesHorizontalList';
import { useFavoritesContext } from '../../context/FavoritesContext';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ( { route, navigation }: Props ) => {
  const { movieId } = route.params;
  const { movie, cast, similarMovies, isLoading } = useMovie( movieId );
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = movie ? isFavorite( movie.id ) : false;

  return (
    <View style={ styles.container }>
      {/* Back button */ }
      <Pressable onPress={ () => navigation.goBack() } style={ styles.backButton }>
        <Text style={ styles.backText }>← Volver</Text>
      </Pressable>

      { movie && (
        <Pressable onPress={ () => toggleFavorite( movie ) } style={ styles.heartButton }>
          <Text style={ styles.heartText }>{ fav ? '❤️' : '🤍' }</Text>
        </Pressable>
      ) }

      { isLoading ? (
        <ActivityIndicator size={ 60 } color="red" style={ styles.loader } />
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
                <Text style={ styles.title }>{ movie?.title }</Text>
                { movie?.tagline ? (
                  <Text style={ styles.tagline }>{ movie.tagline }</Text>
                ) : null }
                <Text style={ styles.rating }>⭐ { movie?.rating.toFixed( 1 ) } / 10</Text>
                { movie?.runtime ? (
                  <Text style={ styles.meta }>🕒 { movie.runtime } min</Text>
                ) : null }
                <Text style={ styles.meta }>
                  📅 { movie?.releaseDate.getFullYear() }
                </Text>
              </View>
            </View>

            { /* Genres */ }
            { movie?.genres && movie.genres.length > 0 && (
              <View style={ styles.genresContainer }>
                { movie.genres.map( genre => (
                  <View key={ genre } style={ styles.genre }>
                    <Text style={ styles.genreText }>{ genre }</Text>
                  </View>
                ) ) }
              </View>
            ) }

            { /* Description */ }
            <Text style={ styles.descriptionTitle }>Sinopsis</Text>
            <Text style={ styles.description }>{ movie?.description }</Text>
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
    backgroundColor: '#fff',
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
    color: '#000',
  },
  tagline: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  meta: {
    fontSize: 14,
    color: '#555',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genre: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 13,
    color: '#333',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
} );
