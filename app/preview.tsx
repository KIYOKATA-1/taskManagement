import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PreviewStyle } from '@/styles/PreviewStyle';
import { LinearGradient } from 'expo-linear-gradient';

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
    <Animated.View style={[PreviewStyle.container, { opacity }]}>
              <LinearGradient
                colors={['#1DE9B6', '#2979FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={PreviewStyle.fab}
              >
                      <TouchableOpacity style={PreviewStyle.button} onPress={onStart}>
        <Text style={PreviewStyle.buttonText}>Начать</Text>
      </TouchableOpacity>
              </LinearGradient>
    </Animated.View>
  );
}

