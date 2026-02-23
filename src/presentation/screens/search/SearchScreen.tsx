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

const POSTER_WIDTH = ( Dimensions.get( 'window' ).width - 48 ) / 3;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { query, setQuery, results, isSearching } = useSearchMovies();

  return (
    <View style={ [styles.container, { paddingTop: top + 8 }] }>
      <Text style={ styles.heading }>Buscar</Text>
      <TextInput
        style={ styles.input }
        placeholder="Título de la película..."
        placeholderTextColor="#999"
        value={ query }
        onChangeText={ setQuery }
        autoCorrect={ false }
      />

      { isSearching && (
        <ActivityIndicator size={ 40 } color="red" style={ styles.loader } />
      ) }

      { !isSearching && query.length > 0 && results.length === 0 && (
        <Text style={ styles.noResults }>No se encontraron resultados</Text>
      ) }

      <FlatList
        data={ results }
        keyExtractor={ item => item.id.toString() }
        numColumns={ 3 }
        contentContainerStyle={ styles.list }
        columnWrapperStyle={ styles.row }
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  loader: {
    marginTop: 40,
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
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
