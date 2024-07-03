import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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
};

interface AuthContextProviderProps {
  readonly children: ReactNode;
}

export const AuthContext = React.createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
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
        // toast.error('Não foi possível buscar seus dados.');
      }
    },
    [loginFn],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutFn();
      setAuth(null);
    } catch (error) {
      // toast.error('Não foi possível buscar seus dados.');
    }
  }, [logoutFn]);

  const value = useMemo(
    () => ({
      auth,
      clientId: auth?.idclient ?? 0,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
      handleLogin,
      handleLogout,
    }),
    [
      auth,
      handleLogin,
      handleLogout,
      isAuthenticated,
      isLoadingLogin,
      isLoadingLogout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
