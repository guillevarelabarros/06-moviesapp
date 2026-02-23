import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Movie } from '../../../core/entities/movie.entity';
import { RootStackParams } from '../../navigation/Navigation';
import { useFavoritesContext } from '../../context/FavoritesContext';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MoviePoster = ({ movie, height = 300, width = 200 }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite( movie.id );

  return (
    <Pressable
      style={ [styles.container, { width, height }] }
      onPress={ () => navigation.navigate( 'Details', { movieId: movie.id } ) }
    >
      <View style={ styles.imageContainer }>
        <Image
          source={ { uri: movie.poster } }
          style={ styles.image }
          resizeMode="cover"
        />
        <Pressable
          style={ styles.heartBtn }
          onPress={ () => toggleFavorite( movie ) }
          hitSlop={ 8 }
        >
          <Text style={ styles.heart }>{ fav ? '❤️' : '🤍' }</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 4,
  },
  heart: {
    fontSize: 18,
  },
});
