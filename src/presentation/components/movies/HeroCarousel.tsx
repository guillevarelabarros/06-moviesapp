import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Movie } from '../../../core/entities/movie.entity';
import { RootStackParams } from '../../navigation/Navigation';

interface Props {
  movies: Movie[];
}

const { width } = Dimensions.get( 'window' );
const INTERVAL_MS = 4000;

export const HeroCarousel = ( { movies }: Props ) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const items = movies.slice( 0, 5 );
  const [activeIndex, setActiveIndex] = useState( 0 );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>( null );

  useEffect( () => {
    timerRef.current = setInterval( () => {
      setActiveIndex( prev => ( prev + 1 ) % items.length );
    }, INTERVAL_MS );
    return () => {
      if ( timerRef.current ) clearInterval( timerRef.current );
    };
  }, [items.length] );

  const movie = items[activeIndex];
  if ( !movie ) return null;

  return (
    <Pressable onPress={ () => navigation.navigate( 'Details', { movieId: movie.id } ) }>
      <ImageBackground
        source={ { uri: movie.backdrop } }
        style={ styles.backdrop }
        resizeMode="cover"
      >
        <View style={ styles.overlay }>
          <Text style={ styles.title } numberOfLines={ 2 }>
            { movie.title }
          </Text>
          <View style={ styles.row }>
            <Image source={ { uri: movie.poster } } style={ styles.poster } resizeMode="cover" />
            <View style={ styles.info }>
              <Text style={ styles.description } numberOfLines={ 4 }>
                { movie.description }
              </Text>
              <View style={ styles.ratingRow }>
                <Text style={ styles.rating }>⭐ { movie.rating.toFixed( 1 ) }</Text>
                <Text style={ styles.year }>{ movie.releaseDate.getFullYear() }</Text>
              </View>
              <Pressable
                style={ styles.button }
                onPress={ () => navigation.navigate( 'Details', { movieId: movie.id } ) }
              >
                <Text style={ styles.buttonText }>Ver detalles</Text>
              </Pressable>
            </View>
          </View>
          { /* Dot indicators */ }
          <View style={ styles.dots }>
            { items.map( ( _, i ) => (
              <Pressable
                key={ i }
                onPress={ () => {
                  setActiveIndex( i );
                  if ( timerRef.current ) clearInterval( timerRef.current );
                  timerRef.current = setInterval( () => {
                    setActiveIndex( prev => ( prev + 1 ) % items.length );
                  }, INTERVAL_MS );
                } }
                style={ [styles.dot, i === activeIndex && styles.dotActive] }
              />
            ) ) }
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create( {
  backdrop: {
    width,
    height: 360,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  poster: {
    width: 90,
    height: 135,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-end',
  },
  description: {
    color: '#ddd',
    fontSize: 13,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rating: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  year: {
    color: '#aaa',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 22,
  },
} );
