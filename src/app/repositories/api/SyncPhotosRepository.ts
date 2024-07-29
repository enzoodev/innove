import {
  ChecklistPhotosStorageRepository,
  TChecklistStoragePhoto,
} from '../local/ChecklistPhotosStorageRepository';
import { BaseRepository } from './shared/BaseRepository';

export class SyncPhotosRepository extends BaseRepository {
  private static async syncChunk(
    photos: Array<TChecklistStoragePhoto>,
    startIndex: number,
    endIndex: number,
  ): Promise<void> {
    const formData = new FormData();

    for (let index = startIndex; index < endIndex; index += 1) {
      const item = photos[index];
      formData.append(`image_${index}`, item as unknown as string);
    }

    const syncedPhotos = await super.create<Array<string>>({
      url: 'syncphotos',
      data: formData,
    });

    syncedPhotos.forEach(item => {
      ChecklistPhotosStorageRepository.deletePhoto(item);
    });
  }

  public static async syncAll(): Promise<void> {
    const chunkSize = 40;
    let startIndex = 0;

    const loop = async () => {
      const photosByUser = ChecklistPhotosStorageRepository.getPhotosByUser();
      const totalOfPhotos = photosByUser.length;

      const endIndex = Math.min(startIndex + chunkSize, totalOfPhotos);

      if (startIndex < totalOfPhotos) {
        await SyncPhotosRepository.syncChunk(
          photosByUser,
          startIndex,
          endIndex,
        );
        startIndex = endIndex;
        await loop();
      }
    };

    await loop();
  }
}
