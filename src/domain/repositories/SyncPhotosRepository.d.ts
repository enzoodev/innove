interface ISyncPhotosRepository {
  syncAll(userId: number): Promise<void>;
}
