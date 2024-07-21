import { useCallback, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { ChecklistRepository } from '@/app/repositories/api/ChecklistRepository';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { useAppNavigation } from '../shared/useAppNavigation';
import { useAppQuery } from '../shared/useAppQuery';
import { useRefreshOnFocus } from '../shared/useRefreshOnFocus';

export const useChecklists = (params: TGetChecklistsParams) => {
  const toast = useToast();
  const navigation = useAppNavigation();

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useAppQuery({
      request: () => ChecklistRepository.getAllChecklists(params),
      queryKey: 'allChecklists',
      params,
      errorMessage: 'Não foi possível buscar seus checklists.',
    });

  const hasDoneChecklist = useMemo(() => {
    if (!data?.doneChecklists) {
      return false;
    }

    return data.doneChecklists.length > 0;
  }, [data?.doneChecklists]);

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

  useRefreshOnFocus(refresh);

  return {
    toDoChecklists: data?.toDoChecklists ?? [],
    doneChecklists: data?.doneChecklists ?? [],
    hasDoneChecklist,
    isLoading,
    isRefetching,
    isPending,
    refetch,
    handleFinishExecution,
    isLoadingFinishExecution,
  };
};
