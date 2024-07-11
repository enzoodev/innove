import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { ChecklistRepository } from '@/app/repositories/api/ChecklistRepository';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { generateQueryKey } from '@/app/utils/generateQueryKey';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';
import { useAppNavigation } from './useAppNavigation';
import { useRefresh } from './useRefresh';

export const useChecklists = (params: TGetChecklistsParams) => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const { key, refresh } = useRefresh();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: generateQueryKey('allChecklists', key, params),
    queryFn: async () => {
      try {
        return await ChecklistRepository.getAllChecklists(params);
      } catch (error) {
        toast.show('Não foi possível buscar seus checklists.', {
          type: 'danger',
          placement: 'top',
        });
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

      toast.show('Execução finalizada com sucesso!', {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      toast.show('Não foi possível finalizar a execução.', {
        type: 'danger',
        placement: 'top',
      });
    }
  }, [finishExecutionFn, navigation, params.idexecution, toast]);

  return {
    toDoChecklists: data?.toDoChecklists ?? [],
    doneChecklists: data?.doneChecklists ?? [],
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refresh,
    refetch,
    handleFinishExecution,
    isLoadingFinishExecution,
  };
};
