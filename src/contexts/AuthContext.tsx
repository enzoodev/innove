import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { AuthStorageRepository } from '@/repositories/local/AuthStorageRepository';
import { AuthRepository } from '@/repositories/api/AuthRepository';

export type AuthContextDataProps = {
  auth: TAuth | null;
  clientId: number;
  isAuthenticated: boolean;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isLoadingRecoverAccount: boolean;
  isLoadingUpdatePassword: boolean;
  handleLogin: (params: TLoginParams) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleCleanAuth: () => void;
  handleRecoverAccount: (params: TRecoverAccountParams) => Promise<boolean>;
  handleUpdatePassword: (params: TUpdatePasswordParams) => Promise<boolean>;
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

  const { mutateAsync: recoverAccountFn, isPending: isLoadingRecoverAccount } =
    useMutation({
      mutationFn: AuthRepository.recoverAccount,
    });

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: AuthRepository.updatePassword,
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
    if (!auth) {
      return;
    }

    setAuth(null);
    AuthStorageRepository.logout();

    toast.show('Falha na autenticação, realize o login novamente.', {
      type: 'danger',
      placement: 'top',
    });
  }, [auth, toast]);

  const handleRecoverAccount = useCallback(
    async (params: TRecoverAccountParams) => {
      try {
        await recoverAccountFn(params);
        return true;
      } catch (error) {
        toast.show('Não foi possível recuperar sua conta.', {
          type: 'danger',
          placement: 'top',
        });

        return false;
      }
    },
    [recoverAccountFn, toast],
  );

  const handleUpdatePassword = useCallback(
    async (params: TUpdatePasswordParams) => {
      try {
        await updatePasswordFn(params);
        toast.show('Senha alterada com sucesso!', {
          type: 'success',
          placement: 'top',
        });
        return true;
      } catch (error) {
        toast.show('Não foi possível alterar sua senha.', {
          type: 'danger',
          placement: 'top',
        });
        return false;
      }
    },
    [updatePasswordFn, toast],
  );

  const value = useMemo(
    () => ({
      auth,
      clientId: auth?.idclient ?? 0,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      handleLogin,
      handleLogout,
      handleCleanAuth,
      handleRecoverAccount,
      handleUpdatePassword,
    }),
    [
      auth,
      handleCleanAuth,
      handleLogin,
      handleLogout,
      handleRecoverAccount,
      handleUpdatePassword,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
