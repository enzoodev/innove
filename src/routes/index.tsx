/* eslint-disable react/style-prop-object */
import { useCallback, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/api/useAuth';

import { HttpServices } from '@/services/HttpServices';

import { TokenStorageRepository } from '@/repositories/local/TokenStorageRepository';

import { AppStatusBar } from '@/components/elements/AppStatusBar';

import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';

type Props = {
  onHideSplash: () => void;
};

export const Routes = ({ onHideSplash }: Props) => {
  const theme = useTheme();
  const { isAuthenticated, handleCleanAuth, handleGetUser } = useAuth();

  DefaultTheme.colors.background = theme.colors.background;

  const fetchUser = useCallback(async () => {
    try {
      const token = TokenStorageRepository.get();
      if (token) {
        await handleGetUser();
      }
    } finally {
      onHideSplash();
    }
  }, [handleGetUser, onHideSplash]);

  useEffect(() => {
    HttpServices.registerInterceptTokenManager = {
      logout: handleCleanAuth,
    };
  }, [handleCleanAuth]);

  return (
    <NavigationContainer onReady={fetchUser} theme={DefaultTheme}>
      <AppStatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
