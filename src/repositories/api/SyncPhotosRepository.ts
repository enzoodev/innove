import {
  ChecklistPhotosStorageRepository,
  TChecklistStoragePhoto,
} from '../local/ChecklistPhotosStorageRepository';
import { BaseRepository } from './shared/BaseRepository';

export class SyncPhotosRepository extends BaseRepository {
  private static async syncChunk(
    photos: Array<TChecklistStoragePhoto>,
    userId: number,
  ): Promise<void> {
    const chunkSize = 10;
    let photoCount = 0;

    const formData = new FormData();

    photos.forEach((item, index) => {
      if (photoCount < chunkSize) {
        formData.append(`image_${index}`, item as unknown as string);
        photoCount += 1;
      }
    });

    const syncedPhotos = await super.create<Array<string>>({
      url: 'syncphotos',
      data: formData,
    });

    syncedPhotos.forEach(item => {
      ChecklistPhotosStorageRepository.deletePhoto(item, userId);
    });
  }

  public static async syncAll(userId: number): Promise<void> {
    const loop = async () => {
      const photosByUser =
        ChecklistPhotosStorageRepository.getPhotosByUser(userId);
      const totalOfPhotos = photosByUser.length;

      if (totalOfPhotos > 0) {
        await SyncPhotosRepository.syncChunk(photosByUser, userId);
        await loop();
      }
    };

    await loop();
  }
}
