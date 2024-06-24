import { BaseRepository } from './shared/BaseRepository';

export type TGetLocationsParams = {
  idclient: number;
};

export class LocationRepositoryClass extends BaseRepository {
  async getLocations(params: TGetLocationsParams) {
    return await super.getAll<TLocation>({
      url: 'local',
      params,
    });
  }
}

export const LocationRepository = new LocationRepositoryClass();
