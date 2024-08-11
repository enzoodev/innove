/* eslint-disable no-useless-constructor */
import { TChecklistStoragePhoto } from '../local/ChecklistPhotosStorageRepository';

export class SyncPhotosRepository implements ISyncPhotosRepository {
  private readonly chunkSize = 10;

  constructor(
    private baseRepository: IBaseRepository,
    private checklistPhotosStorageRepository: IChecklistPhotosStorageRepository,
  ) {}

  private async syncChunk(
    photos: Array<TChecklistStoragePhoto>,
    userId: number,
  ): Promise<void> {
    let photoCount = 0;

    const formData = new FormData();

    photos.forEach((item, index) => {
      if (photoCount < this.chunkSize) {
        formData.append(`image_${index}`, item as unknown as string);
        photoCount += 1;
      }
    });

    const syncedPhotos = await this.baseRepository.create<Array<string>>({
      url: 'syncphotos',
      data: formData,
    });

    syncedPhotos.forEach(item => {
      this.checklistPhotosStorageRepository.deletePhoto(item, userId);
    });
  }

  public async syncAll(userId: number): Promise<void> {
    const loop = async () => {
      const photosByUser =
        this.checklistPhotosStorageRepository.getPhotosByUser(userId);
      const totalOfPhotos = photosByUser.length;

      if (totalOfPhotos > 0) {
        await this.syncChunk(photosByUser, userId);
        await loop();
      }
    };

    await loop();
  }
}
