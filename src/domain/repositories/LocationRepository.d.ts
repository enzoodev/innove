interface ILocationRepository {
  getLocations(params: TGetLocationsParams): Promise<TLocation[]>;
}
