import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
    </Stack>
    </>
    
  );
}
