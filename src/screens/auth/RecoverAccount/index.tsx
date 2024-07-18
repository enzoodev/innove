import { useCallback } from 'react';
import { Image, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconBrandTelegram } from 'tabler-react-native/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  recoverAccountSchema,
  TRecoverAccountSchema,
} from '@/app/schemas/auth/recoverAccountSchema';

import { useAuth } from '@/hooks/useAuth';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';

import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { GoBackButton } from '@/components/elements/GoBackButton';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';
import { EmailIcon } from '@/components/modules/EmailIcon';

import Mail from '@/assets/images/mail.png';

import * as S from './styles';

export const RecoverAccount = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAuthNavigation();
  const { handleRecoverAccount, isLoadingRecoverAccount } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRecoverAccountSchema>({
    resolver: zodResolver(recoverAccountSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<TRecoverAccountSchema> = useCallback(
    async ({ email }) => {
      const isDone = await handleRecoverAccount({ email });
      if (isDone) {
        navigation.navigate('RecoverAccountEmailSent');
      }
    },
    [handleRecoverAccount, navigation],
  );

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <GoBackButton />
            <S.Header>
              <S.Title>Esqueceu a senha?</S.Title>
              <S.Subtitle>
                Escreva seu e-mail cadastrado abaixo para receber instruções de
                redefinição de senha
              </S.Subtitle>
            </S.Header>
            <S.ImageWrapper>
              <Image source={Mail} />
              <EmailIcon
                Icon={() => (
                  <IconBrandTelegram
                    stroke={1.25}
                    size={theme.iconSizes.md}
                    color={theme.colors.mailContrast}
                  />
                )}
              />
            </S.ImageWrapper>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Input
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  formError={errors.email?.message}
                  placeholder="Email"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            <Button
              title="Enviar"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoadingRecoverAccount}
            />
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
