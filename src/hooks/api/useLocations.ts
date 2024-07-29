import { LocationRepository } from '@/repositories/api/LocationRepository';
import { useAppQuery } from '../shared/useAppQuery';

export const useLocations = (params: TGetLocationsParams) => {
  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useAppQuery({
      request: () => LocationRepository.getLocations(params),
      params,
      queryKey: 'locations',
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
