import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { AuthStorageRepository } from '@/app/repositories/local/AuthStorageRepository';
import { AuthRepository } from '@/app/repositories/api/AuthRepository';

export type AuthContextDataProps = {
  auth: TAuth | null;
  clientId: number;
  isAuthenticated: boolean;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  handleLogin: (params: TLoginParams) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleCleanAuth: () => void;
};

interface AuthContextProviderProps {
  readonly children: ReactNode;
}

export const AuthContext = React.createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const toast = useToast();
  const [auth, setAuth] = useState<TAuth | null>(
    AuthStorageRepository.getAuth(),
  );
  const isAuthenticated = !!auth;

  const { mutateAsync: loginFn, isPending: isLoadingLogin } = useMutation({
    mutationFn: AuthRepository.login,
  });

  const { mutateAsync: logoutFn, isPending: isLoadingLogout } = useMutation({
    mutationFn: AuthRepository.logout,
  });

  const handleLogin = useCallback(
    async (params: TLoginParams) => {
      try {
        const data = await loginFn(params);
        setAuth(data);
      } catch (error) {
        toast.show('Não foi possível entrar na sua conta.', {
          type: 'danger',
          placement: 'top',
        });
      }
    },
    [loginFn, toast],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutFn();
      setAuth(null);
    } catch (error) {
      toast.show('Não foi possível fazer sair da sua conta.', {
        type: 'danger',
        placement: 'top',
      });
    }
  }, [logoutFn, toast]);

  const handleCleanAuth = useCallback(() => {
    setAuth(null);
    AuthStorageRepository.logout();

    toast.show('Falha na autenticação, realize o login novamente.', {
      type: 'danger',
      placement: 'top',
    });
  }, [toast]);

  const value = useMemo(
    () => ({
      auth,
      clientId: auth?.idclient ?? 0,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
      handleLogin,
      handleLogout,
      handleCleanAuth,
    }),
    [
      auth,
      handleCleanAuth,
      handleLogin,
      handleLogout,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
