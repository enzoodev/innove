import { StorageRepository } from './shared/StorageRepository';

export class TokenStorageRepository {
  private static tokenKey = `TOKEN`;

  public static get(): string | null {
    return StorageRepository.get(this.tokenKey);
  }

  public static save(token: string): void {
    StorageRepository.set(this.tokenKey, token);
  }

  public static delete(): void {
    StorageRepository.delete(this.tokenKey);
  }
}
