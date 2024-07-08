import { useCallback, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
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
  const toast = useToast();
  const { isAuthenticated, handleLogout } = useAuth();

  DefaultTheme.colors.background = theme.colors.background;

  const loggoutOnUnauthorized = useCallback(async () => {
    await handleLogout();
    toast.show('Falha na autenticação, realize o login novamente.', {
      type: 'danger',
      placement: 'top',
    });
  }, [handleLogout, toast]);

  useEffect(() => {
    HttpServices.registerInterceptTokenManager = {
      logout: loggoutOnUnauthorized,
    };
  }, [loggoutOnUnauthorized]);

  return (
    <NavigationContainer onReady={onReady} theme={DefaultTheme}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
