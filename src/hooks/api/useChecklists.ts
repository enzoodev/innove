import { useCallback, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { ChecklistRepository } from '@/infrastructure/repositories/api/ChecklistRepository';
import { ExecutionRepository } from '@/infrastructure/repositories/api/ExecutionRepository';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import { useFetch } from '@/hooks/shared/useFetch';
import { useAuth } from '@/hooks/api/useAuth';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useChecklists = (params: TGetChecklistsParams) => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const { handleCleanAuth } = useAuth();

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const baseRepository = useMemo(
    () => new BaseRepository(httpServices, new UrlBuilder()),
    [httpServices],
  );
  const checklistRepository = new ChecklistRepository(baseRepository);
  const executionRepository = useMemo(
    () => new ExecutionRepository(baseRepository),
    [baseRepository],
  );

  const [isLoadingFinishExecution, setIsLoadingFinishExecution] =
    useState(false);

  const { data, isLoading, isPending, isRefetching, refetch } = useFetch({
    request: () => checklistRepository.getAllChecklists(params),
    errorMessage: 'Não foi possível buscar seus checklists.',
  });

  const hasDoneChecklist = useMemo(() => {
    if (!data?.doneChecklists) {
      return false;
    }

    return data.doneChecklists.length > 0;
  }, [data?.doneChecklists]);

  const handleFinishExecution = useCallback(async () => {
    try {
      setIsLoadingFinishExecution(true);
      await executionRepository.finishExecution({
        idexecution: params.idexecution,
      });
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
    } finally {
      setIsLoadingFinishExecution(false);
    }
  }, [executionRepository, navigation, params.idexecution, toast]);

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
