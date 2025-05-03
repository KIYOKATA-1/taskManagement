import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          animation: 'none',        
        }}
      >
        <Stack.Screen name="index" />   
        <Stack.Screen name="preview" /> 
        <Stack.Screen name="home" />   
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
