interface ITokenStorageRepository {
  get(): string | null;
  save(token: string): void;
  delete(): void;
}
