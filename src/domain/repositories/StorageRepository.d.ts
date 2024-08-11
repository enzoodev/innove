interface IStorageRepository {
  get<T>(key: string): T | null;
  set(key: string, value: unknown): void;
  delete(key: string): void;
  getAllKeys(): string[];
}
