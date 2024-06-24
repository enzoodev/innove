import React, { ReactNode, useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthStorageRepository } from '@/app/repositories/local/AuthStorageRepository';
import { AuthRepository } from '@/app/repositories/api/AuthRepository';

export type AuthContextDataProps = {
  auth: TAuth | null;
  isAuthenticated: boolean;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  handleLogin: (params: TLoginParams) => Promise<void>;
  handleLogout: () => Promise<void>;
};

interface AuthContextProviderProps {
  children: ReactNode;
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

  const handleLogin = useCallback(async (params: TLoginParams) => {
    try {
      const data = await loginFn(params);
      setAuth(data);
    } catch (error) {
      // toast.error('Não foi possível buscar seus dados.');
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutFn();
      setAuth(null);
    } catch (error) {
      // toast.error('Não foi possível buscar seus dados.');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuthenticated,
        isLoadingLogin,
        isLoadingLogout,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
