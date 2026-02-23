import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../../core/entities/movie.entity';
import { MoviePoster } from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
  onEndReached?: () => void;
}

export const MoviesHorizontalList = ( { movies, title, onEndReached }: Props ) => {
  return (
    <View style={ styles.container }>
      { title && <Text style={ styles.title }>{ title }</Text> }
      <FlatList
        data={ movies }
        horizontal
        keyExtractor={ item => item.id.toString() }
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={ styles.list }
        onEndReached={ onEndReached }
        onEndReachedThreshold={ 0.6 }
        renderItem={ ( { item } ) => <MoviePoster movie={ item } /> }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: '#000',
  },
  list: {
    paddingHorizontal: 8,
  },
} );
