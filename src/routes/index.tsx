/* eslint-disable react/style-prop-object */
import { useCallback } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/api/useAuth';

import { AppStatusBar } from '@/components/elements/AppStatusBar';

import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';

type Props = {
  onHideSplash: () => void;
};

export const Routes = ({ onHideSplash }: Props) => {
  const theme = useTheme();
  const { isAuthenticated, handleGetUser } = useAuth();

  DefaultTheme.colors.background = theme.colors.background;

  const fetchUser = useCallback(async () => {
    try {
      await handleGetUser();
    } finally {
      onHideSplash();
    }
  }, [handleGetUser, onHideSplash]);

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
