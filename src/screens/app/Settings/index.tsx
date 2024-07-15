import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconMail, IconPhone, IconUserCircle } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/useAuth';
import { useAppNavigation } from '@/hooks/useAppNavigation';

import { Header } from '@/components/elements/Header';
import { Button } from '@/components/elements/Button';
import { UserPhoto } from '@/components/elements/UserPhoto';
import { UserInfo } from '@/components/modules/UserInfo';

import * as S from './styles';

export const Settings = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const { auth, handleLogout, isLoadingLogout } = useAuth();

  const handleUpdatePassword = useCallback(() => {
    navigation.navigate('UpdatePassword');
  }, [navigation]);

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.layout[4],
          paddingBottom: insets.bottom,
        }}
      >
        <Header hasBackButton title="Configurações" />
        <S.Content>
          <S.UserPhotoWrapper>
            <UserPhoto size={theme.layout[28]} />
            <S.UserName>{auth?.name}</S.UserName>
          </S.UserPhotoWrapper>
          <S.UserInfoContentWrapper>
            <UserInfo
              Icon={() => (
                <IconUserCircle
                  stroke={1.25}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              )}
              title={auth?.login}
              label="Login"
            />
            <UserInfo
              Icon={() => (
                <IconMail
                  stroke={1.25}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              )}
              title={auth?.email}
              label="Email"
            />
            <UserInfo
              Icon={() => (
                <IconPhone
                  stroke={1.25}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              )}
              title={auth?.phone}
              label="Telefone"
            />
          </S.UserInfoContentWrapper>
          <S.ActionButtonsWrapper>
            <Button
              title="Alterar senha"
              onPress={handleUpdatePassword}
              isLoading={false}
              itsCancelButton
              color={theme.colors.buttonTextColor}
              bgColor={theme.colors.buttonBackground}
            />
            <Button
              title="Sair da conta"
              onPress={handleLogout}
              isLoading={isLoadingLogout}
              itsCancelButton
              color={theme.colors.textPrimary}
              bgColor={theme.colors.background}
              borderColor={theme.colors.textPrimary}
            />
          </S.ActionButtonsWrapper>
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};
