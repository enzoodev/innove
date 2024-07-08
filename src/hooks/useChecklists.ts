import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChecklistRepository } from '@/app/repositories/api/ChecklistRepository';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';
import { useAppNavigation } from './useAppNavigation';

export const useChecklists = (params: TGetChecklistsParams) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const navigation = useAppNavigation();

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

  const {
    mutateAsync: finishExecutionFn,
    isPending: isLoadingFinishExecution,
  } = useMutation({
    mutationFn: ExecutionRepository.finishExecution,
  });

  const handleFinishExecution = useCallback(async () => {
    try {
      await finishExecutionFn({ idexecution: params.idexecution });
      navigation.goBack();
      // toast.success('deu bom!');
    } catch (error) {
      // toast.error('Não foi possível buscar seus dados.');
    }
  }, [finishExecutionFn, navigation, params.idexecution]);

  return {
    toDoChecklists: data?.toDoChecklists ?? [],
    doneChecklists: data?.doneChecklists ?? [],
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refetch,
    handleFinishExecution,
    isLoadingFinishExecution,
  };
};
