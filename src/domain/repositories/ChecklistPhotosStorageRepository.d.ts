interface IChecklistPhotosStorageRepository {
  getPhotosByUser(userId: number): TChecklistStoragePhoto[];
  getHasPhotos(userId: number): boolean;
  generateNameAndType(data: TSaveChecklistStoragePhotoParams): {
    name: string;
    type: string;
  };
  savePhoto(data: TSaveChecklistStoragePhotoParams, userId: number): void;
  deletePhoto(name: string, userId: number): void;
}
