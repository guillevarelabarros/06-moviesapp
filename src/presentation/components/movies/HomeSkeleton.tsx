import { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get( 'window' );

const ShimmerBox = ( { style, bgColor }: { style?: object; bgColor?: string } ) => {
  const opacity = useRef( new Animated.Value( 0.3 ) ).current;

  useEffect( () => {
    Animated.loop(
      Animated.sequence( [
        Animated.timing( opacity, { toValue: 1, duration: 800, useNativeDriver: true } ),
        Animated.timing( opacity, { toValue: 0.3, duration: 800, useNativeDriver: true } ),
      ] ),
    ).start();
  }, [] );

  return <Animated.View style={ [styles.shimmer, style, { opacity, backgroundColor: bgColor ?? '#ddd' }] } />;
};

export const HomeSkeleton = () => {
  const { colors } = useTheme();
  return (
    <ScrollView scrollEnabled={ false }>
      { /* Hero */ }
      <ShimmerBox style={ { width, height: 340 } } bgColor={ colors.skeletonBg } />

      { /* Four list sections */ }
      { [1, 2, 3, 4].map( section => (
        <View key={ section } style={ styles.section }>
          <ShimmerBox style={ styles.sectionTitle } bgColor={ colors.skeletonBg } />
          <View style={ styles.row }>
            { [1, 2, 3, 4].map( i => (
              <ShimmerBox key={ i } style={ styles.card } bgColor={ colors.skeletonBg } />
            ) ) }
          </View>
        </View>
      ) ) }
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  shimmer: {
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
