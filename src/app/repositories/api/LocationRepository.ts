import { BaseRepository } from './shared/BaseRepository';

export class LocationRepositoryClass extends BaseRepository {
  async getLocations(params: TGetLocationsParams) {
    return super.getAll<TLocation>({
      url: 'local',
      params,
    });
  }
}

export const LocationRepository = new LocationRepositoryClass();
