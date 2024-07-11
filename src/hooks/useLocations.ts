import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { LocationRepository } from '@/app/repositories/api/LocationRepository';
import { generateQueryKey } from '@/app/utils/generateQueryKey';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';
import { useRefresh } from './useRefresh';

export const useLocations = (params: TGetLocationsParams) => {
  const toast = useToast();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const { key, refresh } = useRefresh();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: generateQueryKey('locations', key, params),
    queryFn: async () => {
      try {
        return await LocationRepository.getLocations(params);
      } catch (error) {
        toast.show('Não foi possível buscar os locais.', {
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
    refresh,
    refetch,
  };
};
