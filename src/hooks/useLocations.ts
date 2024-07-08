import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { LocationRepository } from '@/app/repositories/api/LocationRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useLocations = (params: TGetLocationsParams) => {
  const toast = useToast();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['locations', ...Object.values(params)],
    queryFn: async () => {
      try {
        return await LocationRepository.getLocations(params);
      } catch (error) {
        toast.show('Não foi possível buscar as localizações.', {
          type: 'danger',
          placement: 'top',
        });
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
