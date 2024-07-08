import { useQuery } from '@tanstack/react-query';
import { LocationRepository } from '@/app/repositories/api/LocationRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useLocations = (params: TGetLocationsParams) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['locations', ...Object.values(params)],
    queryFn: async () => {
      try {
        return await LocationRepository.getLocations(params);
      } catch (error) {
        // toast.error('Não foi possível buscar seus dados.');
      }
    },
    notifyOnChangeProps,
  });

  return {
    locations: data ?? [],
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refetch,
  };
};
