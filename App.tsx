import React, { useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { theme } from '@/theme';
import { Routes } from '@/routes';
import { queryClient } from '@/app/services/queryClient';
import { AuthContextProvider } from '@/app/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontError] = Font.useFonts({
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Routes onReady={onLayoutRootView} />
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
