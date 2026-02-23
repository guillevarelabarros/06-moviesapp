import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { MoviePoster } from '../../components/movies/MoviePoster';
import { useTheme } from '../../context/ThemeContext';

const POSTER_WIDTH = ( Dimensions.get( 'window' ).width - 48 ) / 3;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const FavoritesScreen = () => {
  const { top } = useSafeAreaInsets();
  const { favorites } = useFavoritesContext();
  const { colors } = useTheme();

  return (
    <View style={ [styles.container, { paddingTop: top + 8, backgroundColor: colors.background }] }>
      <Text style={ [styles.heading, { color: colors.text }] }>Mis favoritos</Text>

      { favorites.length === 0 ? (
        <View style={ styles.empty }>
          <Text style={ styles.emptyIcon }>🎬</Text>
          <Text style={ [styles.emptyText, { color: colors.mutedText }] }>No tienes películas favoritas aún</Text>
        </View>
      ) : (
        <FlatList
          data={ favorites }
          keyExtractor={ item => item.id.toString() }
          numColumns={ 3 }
          contentContainerStyle={ styles.list }
          columnWrapperStyle={ styles.row }
          renderItem={ ( { item } ) => (
            <MoviePoster movie={ item } width={ POSTER_WIDTH } height={ POSTER_HEIGHT } />
          ) }
        />
      ) }
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    gap: 8,
    marginBottom: 8,
  },
} );
