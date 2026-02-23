import { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get( 'window' );

const ShimmerBox = ( { style }: { style?: object } ) => {
  const opacity = useRef( new Animated.Value( 0.3 ) ).current;

  useEffect( () => {
    Animated.loop(
      Animated.sequence( [
        Animated.timing( opacity, { toValue: 1, duration: 800, useNativeDriver: true } ),
        Animated.timing( opacity, { toValue: 0.3, duration: 800, useNativeDriver: true } ),
      ] ),
    ).start();
  }, [] );

  return <Animated.View style={ [styles.shimmer, style, { opacity }] } />;
};

export const HomeSkeleton = () => {
  return (
    <ScrollView scrollEnabled={ false }>
      { /* Hero */ }
      <ShimmerBox style={ { width, height: 340 } } />

      { /* Four list sections */ }
      { [1, 2, 3, 4].map( section => (
        <View key={ section } style={ styles.section }>
          <ShimmerBox style={ styles.sectionTitle } />
          <View style={ styles.row }>
            { [1, 2, 3, 4].map( i => (
              <ShimmerBox key={ i } style={ styles.card } />
            ) ) }
          </View>
        </View>
      ) ) }
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  shimmer: {
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  section: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    width: 140,
    height: 22,
    borderRadius: 6,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: 120,
    height: 180,
    borderRadius: 12,
  },
} );
