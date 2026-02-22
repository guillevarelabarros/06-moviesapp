import { Text, View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';

export const HomeScreen = () => {
  const { nowPlaying, isLoading } = useMovies();

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};
