import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { AuthRepository } from '@/infrastructure/repositories/api/AuthRepository';
import { TokenStorageRepository } from '@/infrastructure/repositories/local/TokenStorageRepository';
import { StorageRepository } from '@/infrastructure/repositories/local/shared/StorageRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

export type AuthContextDataProps = {
  auth: TAuth | null;
  userId: number;
  clientId: number;
  isAuthenticated: boolean;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isLoadingRecoverAccount: boolean;
  isLoadingUpdatePassword: boolean;
  isLoadingUser: boolean;
  handleLogin: (params: TLoginParams) => Promise<void>;
  handleGetUser: () => Promise<void>;
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
  const [auth, setAuth] = useState<TAuth | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingRecoverAccount, setIsLoadingRecoverAccount] = useState(false);
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] = useState(false);
  const isAuthenticated = !!auth;

  const tokenStorageRepository = useMemo(
    () => new TokenStorageRepository(new StorageRepository()),
    [],
  );

  const handleCleanAuth = useCallback(() => {
    setAuth(null);
    tokenStorageRepository.delete();

    toast.show('Falha na autenticação, realize o login novamente.', {
      type: 'danger',
      placement: 'top',
    });
  }, [toast, tokenStorageRepository]);

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });

  const authRepository = useMemo(
    () => new AuthRepository(httpServices, tokenStorageRepository),
    [httpServices, tokenStorageRepository],
  );

  const handleGetUser = useCallback(async () => {
    try {
      setIsLoadingUser(true);
      const data = await authRepository.getUser();
      setAuth(data);
    } catch (error) {
      toast.show('Não foi possível carregar buscar seus dados.', {
        type: 'danger',
        placement: 'top',
      });
    } finally {
      setIsLoadingUser(false);
    }
  }, [authRepository, toast]);

  const handleLogin = useCallback(
    async (params: TLoginParams) => {
      try {
        setIsLoadingLogin(true);
        const data = await authRepository.login(params);
        setAuth(data);
      } catch (error) {
        toast.show('Não foi possível entrar na sua conta.', {
          type: 'danger',
          placement: 'top',
        });
      } finally {
        setIsLoadingLogin(false);
      }
    },
    [authRepository, toast],
  );

  const handleLogout = useCallback(async () => {
    try {
      setIsLoadingLogout(true);
      await authRepository.logout();
      setAuth(null);
    } catch (error) {
      toast.show('Não foi possível fazer sair da sua conta.', {
        type: 'danger',
        placement: 'top',
      });
    } finally {
      setIsLoadingLogout(false);
    }
  }, [authRepository, toast]);

  const handleRecoverAccount = useCallback(
    async (params: TRecoverAccountParams) => {
      try {
        setIsLoadingRecoverAccount(true);
        await authRepository.recoverAccount(params);
        return true;
      } catch (error) {
        toast.show('Não foi possível recuperar sua conta.', {
          type: 'danger',
          placement: 'top',
        });

        return false;
      } finally {
        setIsLoadingRecoverAccount(false);
      }
    },
    [authRepository, toast],
  );

  const handleUpdatePassword = useCallback(
    async (params: TUpdatePasswordParams) => {
      try {
        setIsLoadingUpdatePassword(true);
        await authRepository.updatePassword(params);
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
      } finally {
        setIsLoadingUpdatePassword(false);
      }
    },
    [authRepository, toast],
  );

  const value = useMemo(
    () => ({
      auth,
      clientId: auth?.idclient ?? 0,
      userId: auth?.iduser ?? 0,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      handleGetUser,
      isLoadingUser,
      handleLogin,
      handleLogout,
      handleCleanAuth,
      handleRecoverAccount,
      handleUpdatePassword,
    }),
    [
      auth,
      handleCleanAuth,
      handleGetUser,
      isLoadingUser,
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
