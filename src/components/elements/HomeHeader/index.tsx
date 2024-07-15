import { memo, useCallback } from 'react';
import { IconSettings, IconWifi } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/useAuth';
import { useAppNavigation } from '@/hooks/useAppNavigation';

import { UserPhoto } from '@/components/elements/UserPhoto';

import * as S from './styles';

export const HomeHeader = memo(() => {
  const theme = useTheme();
  const navigation = useAppNavigation();
  const { auth } = useAuth();

  const handleGoToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  return (
    <S.Container>
      <S.Content>
        <UserPhoto size={theme.layout[12]} />
        <S.UserTextWrapper>
          <S.UserNameLabel>Olá,</S.UserNameLabel>
          <S.UserName>{auth?.name}</S.UserName>
        </S.UserTextWrapper>
      </S.Content>
      <S.ButtonsWrapper>
        <S.SyncPhotosButton>
          <IconWifi
            stroke={1.5}
            size={theme.iconSizes.sm}
            color={theme.colors.mainContrast}
          />
        </S.SyncPhotosButton>
        <S.SettingsButton onPress={handleGoToSettings}>
          <IconSettings
            stroke={1.5}
            size={theme.iconSizes.md}
            color={theme.colors.textSecondary}
          />
        </S.SettingsButton>
      </S.ButtonsWrapper>
    </S.Container>
  );
});
