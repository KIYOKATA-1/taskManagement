import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function PreviewScreen() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onStart = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/home');
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Начать</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
