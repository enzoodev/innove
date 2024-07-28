/*
  iduser: number;
        4.3) Padronização da foto de Não Conformidade: (número 3 acima)
A foto de não conformidade deve seguir o seguinte padrão:
nc_<idexecution>_<idchecklist>_<idquestion>_<contador>.jpeg
exemplo: nc_5_4_23_1.jpeg e nc_5_4_23_2.jpeg
Onde o NC é o identificador da não conformidade da questão, usar tamanho reduzido, não ultrapassar 1mb.

        4.4) Padronização das fotos complementares: (número 4 acima)
As fotos complementares deve seguir o seguinte padrão por checklist:
comp_<idexecution>_<idchecklist>_<contador>.jpeg
exemplo: comp_5_4_1.jpeg e comp_5_4_2.jpeg
Onde o COMP é o identificador de complementar do checklis, usar tamanho reduzido, não ultrapassar 1mb.
*/

import { AuthStorageRepository } from './AuthStorageRepository';
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

  private static getUserKey(): string {
    const userId = AuthStorageRepository.getUserId();
    return `userId:${userId}`;
  }

  public static getPhotosByUser(): TChecklistStoragePhoto[] {
    const keys = StorageRepository.getAllKeys();
    const userKey = this.getUserKey();
    const keysByUser = keys.filter(key => key.includes(userKey));
    const photosByUser = keysByUser.map(key =>
      StorageRepository.get<TChecklistStoragePhoto>(key),
    );

    return photosByUser as TChecklistStoragePhoto[];
  }

  public static getHasPhotos(): boolean {
    const photos = this.getPhotosByUser();
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

  private static generateKey(data: TSaveChecklistStoragePhotoParams): string {
    const userKey = this.getUserKey();
    const { name } = this.generateNameAndType(data);
    return `${this.storageKey}_${userKey}_${name}`;
  }

  public static savePhoto(data: TSaveChecklistStoragePhotoParams): void {
    const key = this.generateKey(data);
    const { name, type } = this.generateNameAndType(data);

    StorageRepository.set(key, {
      uri: data.photoUri,
      name,
      type,
    });
  }

  public static deletePhoto(name: string): void {
    const userKey = this.getUserKey();
    const key = `${this.storageKey}_${userKey}_${name}`;
    StorageRepository.delete(key);
  }
}
