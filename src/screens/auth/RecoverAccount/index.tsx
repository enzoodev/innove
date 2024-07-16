import { useCallback } from 'react';
import { useTheme } from 'styled-components/native';
import { IconCheck } from 'tabler-react-native/icons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  recoverAccountSchema,
  TRecoverAccountSchema,
} from '@/app/schemas/auth/recoverAccount';

import { useAuth } from '@/hooks/useAuth';

import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { Header } from '@/components/elements/Header';
import { EmailIcon } from '@/components/modules/EmailIcon';

import Mail from '@/assets/images/mail.png';

import * as S from './styles';

export const RecoverAccount = () => {
  const theme = useTheme();
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
      await handleRecoverAccount({ email });
    },
    [handleRecoverAccount],
  );

  return (
    <S.Container>
      <Header hasBackButton />
      <S.Content>
        <S.Header>
          <S.Title>Esqueceu a senha?</S.Title>
          <S.Subtitle>
            Escreva seu e-mail cadastrado abaixo para receber instruções de
            redefinição de senha
          </S.Subtitle>
        </S.Header>
        <S.ImageWrapper>
          <S.IconImage source={Mail} />
          <EmailIcon
            Icon={() => (
              <IconCheck
                stroke={1.5}
                size={theme.iconSizes.lg}
                color={theme.colors.mailContrast}
              />
            )}
          />
        </S.ImageWrapper>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur, ref } }) => (
            <Label title="Email">
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
            </Label>
          )}
        />
        <Button
          title="Enviar"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoadingRecoverAccount}
        />
      </S.Content>
    </S.Container>
  );
};
