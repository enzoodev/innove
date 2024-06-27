import { useQuery } from '@tanstack/react-query';
import {
  ChecklistRepository,
  TGetChecklistsParams,
} from '@/app/repositories/api/ChecklistRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useChecklists = (params: TGetChecklistsParams) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['allChecklists', ...Object.values(params)],
    queryFn: async () => {
      try {
        return await ChecklistRepository.getAllChecklists(params);
      } catch (error) {
        // toast.error('Não foi possível buscar seus dados.');
      }
    },
    notifyOnChangeProps,
  });

  return {
    toDoChecklists: data?.toDoChecklists ?? [],
    doneChecklists: data?.doneChecklists ?? [],
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refetch,
  };
};
