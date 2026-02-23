import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Movie } from '../../../core/entities/movie.entity';
import { RootStackParams } from '../../navigation/Navigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MoviePoster = ({ movie, height = 300, width = 200 }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

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
});
