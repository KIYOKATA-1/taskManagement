import { HomeStyle } from '@/styles/HomeStyle';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={HomeStyle.container}>
      <Text style={HomeStyle.title}>Welcome to Home!</Text>
    </SafeAreaView>
  );
}

