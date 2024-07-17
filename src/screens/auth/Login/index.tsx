import { useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, TLoginSchema } from '@/app/schemas/auth/loginSchema';

import { useAuth } from '@/hooks/useAuth';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';

import { Logo } from '@/components/elements/Logo';
import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { PasswordInput } from '@/components/elements/PasswordInput';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';

import * as S from './styles';

export const Login = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const navigation = useAuthNavigation();
  const { handleLogin, isLoadingLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleRecoverPassword = useCallback(() => {
    navigation.navigate('RecoverAccount');
  }, [navigation]);

  const onSubmit: SubmitHandler<TLoginSchema> = useCallback(
    async data => {
      await handleLogin({
        login: data.login,
        pass: data.password,
        devicetype: '2',
      });
    },
    [handleLogin],
  );

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingTop: dimensions.height * 0.15,
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <Logo size={60} />
            <S.FormWrapper>
              <S.Label>Acesse sua conta</S.Label>
              <Controller
                control={control}
                name="login"
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <Label title="Usuário">
                    <Input
                      ref={ref}
                      value={value}
                      onChangeText={onChange}
                      formError={errors.login?.message}
                      placeholder="Usuário"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        setFocus('password');
                      }}
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <Label title="Senha">
                    <PasswordInput
                      ref={ref}
                      value={value}
                      onChangeText={onChange}
                      placeholder="Senha"
                      formError={errors.password?.message}
                      onBlur={onBlur}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  </Label>
                )}
              />
            </S.FormWrapper>
            <Button
              title="Entrar"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoadingLogin}
              color={theme.colors.buttonBodyTextColor}
              bgColor={theme.colors.buttonBodyBackground}
            />
            <TouchableOpacity onPress={handleRecoverPassword}>
              <S.ForgotPassword>Esqueci minha senha</S.ForgotPassword>
            </TouchableOpacity>
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
