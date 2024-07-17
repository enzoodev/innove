import { useCallback } from 'react';
import { Image, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { StackActions } from '@react-navigation/native';
import { IconCheck } from 'tabler-react-native/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthNavigation } from '@/hooks/useAuthNavigation';

import { Button } from '@/components/elements/Button';
import { GoBackButton } from '@/components/elements/GoBackButton';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';
import { EmailIcon } from '@/components/modules/EmailIcon';

import Mail from '@/assets/images/mail.png';

import * as S from './styles';

export const RecoverAccountEmailSent = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAuthNavigation();

  const handleResendEmail = useCallback(() => {
    const action = StackActions.pop(1);
    navigation.dispatch(action);
  }, [navigation]);

  const handleGoToLogin = useCallback(() => {
    const action = StackActions.popToTop();
    navigation.dispatch(action);
  }, [navigation]);

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <GoBackButton goBackAll />
            <S.Header>
              <S.Title>O email foi enviado!</S.Title>
              <S.Subtitle>
                verifique sua caixa de entrada e visualize suas credenciais de
                login
              </S.Subtitle>
            </S.Header>
            <S.ImageWrapper>
              <Image source={Mail} />
              <EmailIcon
                Icon={() => (
                  <IconCheck
                    stroke={2.5}
                    size={theme.iconSizes.md}
                    color={theme.colors.mailContrast}
                  />
                )}
              />
            </S.ImageWrapper>
            <S.ButtonWrapper>
              <Button title="Login" onPress={handleGoToLogin} />
            </S.ButtonWrapper>
            <S.ResendMailWrapper>
              <S.ResendMailText>Não recebeu o email?</S.ResendMailText>
              <S.ResendMailButton onPress={handleResendEmail}>
                <S.ResendMailButtonText>Reenviar</S.ResendMailButtonText>
              </S.ResendMailButton>
            </S.ResendMailWrapper>
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
