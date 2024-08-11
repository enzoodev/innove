/* eslint-disable react/style-prop-object */
import { useCallback, useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { TokenStorageRepository } from '@/infrastructure/repositories/local/TokenStorageRepository';
import { StorageRepository } from '@/infrastructure/repositories/local/shared/StorageRepository';

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

  const tokenStorageRepository = useMemo(
    () => new TokenStorageRepository(new StorageRepository()),
    [],
  );

  const fetchUser = useCallback(async () => {
    try {
      const token = tokenStorageRepository.get();
      if (token) {
        await handleGetUser();
      }
    } finally {
      onHideSplash();
    }
  }, [handleGetUser, onHideSplash, tokenStorageRepository]);

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
