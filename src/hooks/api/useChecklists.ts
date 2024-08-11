import { useCallback, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';

import { ChecklistRepository } from '@/infrastructure/repositories/api/ChecklistRepository';
import { ExecutionRepository } from '@/infrastructure/repositories/api/ExecutionRepository';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import { useRefreshOnFocus } from '@/hooks/shared/useRefreshOnFocus';
import { useAppQuery } from '@/hooks/shared/useAppQuery';
import { useAuth } from '@/hooks/api/useAuth';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useChecklists = (params: TGetChecklistsParams) => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const { handleCleanAuth } = useAuth();

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const baseRepository = new BaseRepository(httpServices, new UrlBuilder());
  const checklistRepository = new ChecklistRepository(baseRepository);
  const executionRepository = new ExecutionRepository(baseRepository);

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useAppQuery({
      request: () => checklistRepository.getAllChecklists(params),
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
    mutationFn: executionRepository.finishExecution,
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
