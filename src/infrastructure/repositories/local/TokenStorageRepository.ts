/* eslint-disable no-useless-constructor */

export class TokenStorageRepository implements ITokenStorageRepository {
  private tokenKey = `TOKEN`;

  constructor(private storageRepository: IStorageRepository) {}

  public get(): string | null {
    return this.storageRepository.get(this.tokenKey);
  }

  public save(token: string): void {
    this.storageRepository.set(this.tokenKey, token);
  }

  public delete(): void {
    this.storageRepository.delete(this.tokenKey);
  }
}
