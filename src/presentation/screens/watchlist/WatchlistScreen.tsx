import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWatchlistContext } from '../../context/WatchlistContext';
import { MoviePoster } from '../../components/movies/MoviePoster';
import { useTheme } from '../../context/ThemeContext';

const POSTER_WIDTH = ( Dimensions.get( 'window' ).width - 48 ) / 3;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const WatchlistScreen = () => {
  const { top } = useSafeAreaInsets();
  const { watchlist, toggleWatchlist } = useWatchlistContext();
  const { colors } = useTheme();

  return (
    <View style={ [styles.container, { paddingTop: top + 8, backgroundColor: colors.background }] }>
      <Text style={ [styles.heading, { color: colors.text }] }>Ver después</Text>

      { watchlist.length === 0 ? (
        <View style={ styles.empty }>
          <Text style={ styles.emptyIcon }>🕐</Text>
          <Text style={ [styles.emptyText, { color: colors.mutedText }] }>
            Tu lista "Ver después" está vacía
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={ watchlist }
            keyExtractor={ item => item.id.toString() }
            numColumns={ 3 }
            contentContainerStyle={ styles.list }
            columnWrapperStyle={ styles.row }
            renderItem={ ( { item } ) => (
              <MoviePoster movie={ item } width={ POSTER_WIDTH } height={ POSTER_HEIGHT } />
            ) }
          />
          <Pressable
            style={ [styles.clearBtn, { borderColor: colors.border }] }
            onPress={ () => watchlist.forEach( m => toggleWatchlist( m ) ) }
          >
            <Text style={ [styles.clearText, { color: colors.mutedText }] }>Limpiar lista</Text>
          </Pressable>
        </>
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
    paddingBottom: 16,
  },
  row: {
    gap: 8,
    marginBottom: 8,
  },
  clearBtn: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  clearText: {
    fontSize: 14,
  },
} );
