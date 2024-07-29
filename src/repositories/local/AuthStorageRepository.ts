import { StorageRepository } from './shared/StorageRepository';

export class AuthStorageRepository {
  private static authKey = 'AUTH';

  private static tokenKey = `${this.authKey}_TOKEN`;

  public static getToken(): string | null {
    const token = StorageRepository.get<string>(this.tokenKey);
    return token;
  }

  public static saveToken(token: string): void {
    StorageRepository.set(this.tokenKey, token);
  }

  public static deleteToken(): void {
    StorageRepository.delete(this.tokenKey);
  }

  public static getAuth(): TAuth | null {
    const auth = StorageRepository.get<TAuth>(this.authKey);
    return auth;
  }

  public static getUserId(): number {
    const auth = this.getAuth();

    if (!auth) {
      throw new Error('Usuário não autenticado.');
    }

    return auth.iduser;
  }

  public static saveAuth(auth: TAuth): void {
    StorageRepository.set(this.authKey, auth);
  }

  public static deleteAuth(): void {
    StorageRepository.delete(this.authKey);
  }

  public static login(auth: TAuth): void {
    this.saveToken(auth.token);
    this.saveAuth(auth);
  }

  public static logout(): void {
    this.deleteToken();
    this.deleteAuth();
  }
}
