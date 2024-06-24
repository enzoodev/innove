import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HttpServices } from '@/app/services/HttpServices';
import { useAuth } from '@/hooks/useAuth';
import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';

type Props = {
  onReady: () => void;
};

export const Routes = ({ onReady }: Props) => {
  const theme = useTheme();
  const { isAuthenticated, handleLogout } = useAuth();

  DefaultTheme.colors.background = theme.colors.background;

  useEffect(() => {
    HttpServices.registerInterceptTokenManager = {
      logout: handleLogout,
    };
  }, []);

  return (
    <NavigationContainer onReady={onReady} theme={DefaultTheme}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
