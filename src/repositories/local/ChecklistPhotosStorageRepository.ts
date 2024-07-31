import { StorageRepository } from './shared/StorageRepository';

export type TSaveChecklistStoragePhotoParams = {
  executionId: string;
  checklistId: string;
  questionId?: string;
  counter: number;
  photoUri: string;
};

export type TChecklistStoragePhoto = {
  uri: string;
  name: string;
  type: string;
};

export class ChecklistPhotosStorageRepository {
  private static storageKey = 'CHECKLIST_PHOTOS';

  private static getUserKey(userId: number): string {
    return `userId:${userId}`;
  }

  public static getPhotosByUser(userId: number): TChecklistStoragePhoto[] {
    const keys = StorageRepository.getAllKeys();
    const userKey = this.getUserKey(userId);
    const keysByUser = keys.filter(key => key.includes(userKey));
    const photosByUser = keysByUser.map(key =>
      StorageRepository.get<TChecklistStoragePhoto>(key),
    );
    const filteredPhotos = photosByUser.filter(
      photo => !!photo,
    ) as TChecklistStoragePhoto[];

    return filteredPhotos;
  }

  public static getHasPhotos(userId: number): boolean {
    const photos = this.getPhotosByUser(userId);
    return photos.length > 0;
  }

  public static generateNameAndType(data: TSaveChecklistStoragePhotoParams): {
    name: string;
    type: string;
  } {
    const prefix = data.questionId ? 'nc' : 'comp';
    const fileExtension = data.photoUri.split('.').pop();
    const questionPrefix = data.questionId ? `_${data.questionId}` : '';

    if (!fileExtension) {
      throw new Error('Extensão do arquivo não encontrada.');
    }

    return {
      name: `${prefix}_${data.executionId}_${data.checklistId}${questionPrefix}_${data.counter}.${fileExtension}`,
      type: `image/${fileExtension}`,
    };
  }

  private static generateKey(
    data: TSaveChecklistStoragePhotoParams,
    userId: number,
  ): string {
    const userKey = this.getUserKey(userId);
    const { name } = this.generateNameAndType(data);
    return `${this.storageKey}_${userKey}_${name}`;
  }

  public static savePhoto(
    data: TSaveChecklistStoragePhotoParams,
    userId: number,
  ): void {
    const key = this.generateKey(data, userId);
    const { name, type } = this.generateNameAndType(data);

    StorageRepository.set(key, {
      uri: data.photoUri,
      name,
      type,
    });
  }

  public static deletePhoto(name: string, userId: number): void {
    const userKey = this.getUserKey(userId);
    const key = `${this.storageKey}_${userKey}_${name}`;
    StorageRepository.delete(key);
  }
}
