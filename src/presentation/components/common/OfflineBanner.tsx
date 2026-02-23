import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState( false );
  const translateY = useState( new Animated.Value( -50 ) )[0];

  useEffect( () => {
    const unsubscribe = NetInfo.addEventListener( state => {
      const offline = !( state.isConnected && state.isInternetReachable !== false );
      setIsOffline( offline );
      Animated.timing( translateY, {
        toValue: offline ? 0 : -50,
        duration: 300,
        useNativeDriver: true,
      } ).start();
    } );
    return unsubscribe;
  }, [] );

  if ( !isOffline ) return null;

  return (
    <Animated.View style={ [styles.banner, { transform: [{ translateY }] }] }>
      <Text style={ styles.text }>⚠️ Sin conexión a internet</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create( {
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#b00020',
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
} );
