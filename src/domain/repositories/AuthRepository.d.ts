interface IAuthRepository {
  getUser(): Promise<TAuth | null>;
  login(params: TLoginParams): Promise<TAuth>;
  logout(): Promise<void>;
  recoverAccount(params: TRecoverAccountParams): Promise<void>;
  updatePassword(params: TUpdatePasswordParams): Promise<void>;
}
