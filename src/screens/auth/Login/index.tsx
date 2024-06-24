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
import { AppStatusBar } from '@/components/elements/AppStatusBar';
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
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleRecoverPassword = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onSubmit: SubmitHandler<TLoginSchema> = useCallback(async data => {
    try {
      await handleLogin({
        login: data.login,
        pass: data.password,
        devicetype: '2',
      });
    } catch (error) {}
  }, []);

  return (
    <S.Container>
      <AppStatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: dimensions.height * 0.15,
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <Logo size={200} />
            <S.FormWrapper>
              <S.Label>Acesse sua conta</S.Label>
              <Controller
                control={control}
                name="login"
                render={({ field: { onChange, value } }) => (
                  <Label title="Usuário">
                    <Input
                      value={value}
                      onChangeText={onChange}
                      formError={errors.login?.message}
                      placeholder="Usuário"
                      autoCapitalize="none"
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Label title="Senha">
                    <PasswordInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Senha"
                      formError={errors.password?.message}
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
