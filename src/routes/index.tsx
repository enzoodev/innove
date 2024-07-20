/* eslint-disable react/style-prop-object */
import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/api/useAuth';

import { HttpServices } from '@/app/services/HttpServices';

import { AppStatusBar } from '@/components/elements/AppStatusBar';

import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';

type Props = {
  onReady: () => void;
};

export const Routes = ({ onReady }: Props) => {
  const theme = useTheme();
  const { isAuthenticated, handleCleanAuth } = useAuth();

  DefaultTheme.colors.background = theme.colors.background;

  useEffect(() => {
    HttpServices.registerInterceptTokenManager = {
      logout: handleCleanAuth,
    };
  }, [handleCleanAuth]);

  return (
    <NavigationContainer onReady={onReady} theme={DefaultTheme}>
      <AppStatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
