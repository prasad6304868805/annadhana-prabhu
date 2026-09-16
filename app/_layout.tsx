import React, { useEffect } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Cinzel_400Regular,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
  NotoSerifTelugu_300Light,
  NotoSerifTelugu_400Regular,
  NotoSerifTelugu_500Medium,
} from '@expo-google-fonts/noto-serif-telugu';
import { SANCTUM_COLORS } from '../constants/theme';

// Prevent native splash screen from auto-hiding while fonts load
SplashScreen.preventAutoHideAsync().catch(() => {
  // Reloading or running in unsupported environment
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Cinzel_400Regular,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    NotoSerifTelugu_300Light,
    NotoSerifTelugu_400Regular,
    NotoSerifTelugu_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  // Inject web reset styles once on web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.style.backgroundColor = SANCTUM_COLORS.background;
      document.body.style.backgroundColor = SANCTUM_COLORS.background;
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return <View style={styles.darkBackground} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: SANCTUM_COLORS.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="map-placeholder" />
        <Stack.Screen name="splash" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SANCTUM_COLORS.background,
  },
  darkBackground: {
    flex: 1,
    backgroundColor: SANCTUM_COLORS.background,
  },
});
