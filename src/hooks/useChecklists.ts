import { useQuery } from '@tanstack/react-query';
import { ChecklistRepository, TGetChecklistsParams } from '@/app/repositories/api/ChecklistRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useChecklists = (params: TGetChecklistsParams) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allChecklists', ...Object.values(params)],
    queryFn: () => ChecklistRepository.getAllChecklists(params),
    notifyOnChangeProps,
  });

  return {
    isLoading,
    toDoChecklists: data?.toDoChecklists ?? [],
    doneChecklists: data?.doneChecklists ?? [],
    refetch,
  };
};
