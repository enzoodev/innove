import { LocationRepository } from '@/infrastructure/repositories/api/LocationRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';

import { useAuth } from '@/hooks/api/useAuth';
import { useFetch } from '@/hooks/shared/useFetch';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useLocations = (params: TGetLocationsParams) => {
  const { handleCleanAuth } = useAuth();

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const baseRepository = new BaseRepository(httpServices, new UrlBuilder());
  const locationRepository = new LocationRepository(baseRepository);

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useFetch({
      request: () => locationRepository.getLocations(params),
      errorMessage: 'Não foi possível buscar os locais.',
    });

  return {
    locations: data ?? [],
    isLoading,
    isRefetching,
    isPending,
    refresh,
    refetch,
  };
};
