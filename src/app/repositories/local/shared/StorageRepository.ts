import { MMKV } from 'react-native-mmkv';

const encodedKeyBase64 = 'aW5ub3ZlIHN0b3JhZ2Uga2V5';
const mmkv = new MMKV({ id: encodedKeyBase64 });

export class StorageRepository {
  private static baseKey = '@INNOVE_STORAGE_KEY';

  private static makeKey(key: string): string {
    if (key.includes(this.baseKey)) {
      return key;
    }

    return `${this.baseKey}_${key}`;
  }

  public static get<T>(key: string): T | null {
    const storageKey = this.makeKey(key);
    const value = mmkv.getString(storageKey);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  public static set(key: string, value: unknown): void {
    const storageKey = this.makeKey(key);
    mmkv.set(storageKey, JSON.stringify(value));
  }

  public static delete(key: string): void {
    const storageKey = this.makeKey(key);
    mmkv.delete(storageKey);
  }

  public static getAllKeys(): string[] {
    return mmkv.getAllKeys();
  }
}
