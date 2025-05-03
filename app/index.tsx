import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/preview');
      });
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.image}
        contentFit="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
