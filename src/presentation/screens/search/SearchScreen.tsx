import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { MoviePoster } from '../../components/movies/MoviePoster';
import { useTheme } from '../../context/ThemeContext';

const POSTER_WIDTH = ( Dimensions.get( 'window' ).width - 48 ) / 3;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { query, setQuery, results, isSearching, fetchNextPage } = useSearchMovies();
  const { colors } = useTheme();

  return (
    <View style={ [styles.container, { paddingTop: top + 8, backgroundColor: colors.background }] }>
      <Text style={ [styles.heading, { color: colors.text }] }>Buscar</Text>
      <TextInput
        style={ [styles.input, { backgroundColor: colors.input, color: colors.inputText }] }
        placeholder="Título de la película..."
        placeholderTextColor={ colors.inputPlaceholder }
        value={ query }
        onChangeText={ setQuery }
        autoCorrect={ false }
      />

      { isSearching && (
        <ActivityIndicator size={ 40 } color="red" style={ styles.loader } />
      ) }

      { !isSearching && query.length > 0 && results.length === 0 && (
        <Text style={ [styles.noResults, { color: colors.mutedText }] }>No se encontraron resultados</Text>
      ) }

      <FlatList
        data={ results }
        keyExtractor={ item => item.id.toString() }
        numColumns={ 3 }
        contentContainerStyle={ styles.list }
        columnWrapperStyle={ styles.row }
        onEndReached={ fetchNextPage }
        onEndReachedThreshold={ 0.6 }
        renderItem={ ( { item } ) => (
          <MoviePoster movie={ item } width={ POSTER_WIDTH } height={ POSTER_HEIGHT } />
        ) }
      />
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
    marginBottom: 12,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  loader: {
    marginTop: 40,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    gap: 8,
    marginBottom: 8,
  },
} );
