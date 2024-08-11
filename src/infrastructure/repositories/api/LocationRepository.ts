/* eslint-disable no-useless-constructor */

export class LocationRepository implements ILocationRepository {
  constructor(private baseRepository: IBaseRepository) {}

  public async getLocations(params: TGetLocationsParams) {
    return this.baseRepository.getAll<TLocation>({
      url: 'local',
      params,
    });
  }
}
