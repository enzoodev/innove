import { memo } from 'react';
import { IconSettings, IconWifi } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { PhotoFormatter } from '@/app/utils/PhotoFormatter';
import { useAuth } from '@/hooks/useAuth';

import * as S from './styles';

export const HomeHeader = memo(() => {
  const theme = useTheme();
  const { auth } = useAuth();

  if (!auth) {
    return null;
  }

  const photoUri = PhotoFormatter.formatUri(auth.client_logo_icon);

  return (
    <S.Container>
      <S.Content>
        <S.UserPhoto source={{ uri: photoUri }} />
        <S.UserTextWrapper>
          <S.UserNameLabel>Olá,</S.UserNameLabel>
          <S.UserName>{auth.name}</S.UserName>
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
        <S.SettingsButton>
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
