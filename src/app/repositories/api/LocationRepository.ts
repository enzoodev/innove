import { BaseRepository } from './shared/BaseRepository';

export class LocationRepository extends BaseRepository {
  public static async getLocations(params: TGetLocationsParams) {
    return super.getAll<TLocation>({
      url: 'local',
      params,
    });
  }
}
