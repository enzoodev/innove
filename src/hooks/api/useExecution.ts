import { useCallback, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { ExecutionRepository } from '@/infrastructure/repositories/api/ExecutionRepository';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import { useFetch } from '@/hooks/shared/useFetch';
import { useAuth } from '@/hooks/api/useAuth';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useExecution = () => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const { handleCleanAuth } = useAuth();
  const [isLoadingStartExecution, setIsLoadingStartExecution] = useState(false);

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const executionRepository = useMemo(
    () =>
      new ExecutionRepository(
        new BaseRepository(httpServices, new UrlBuilder()),
      ),
    [httpServices],
  );

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useFetch({
      request: () => executionRepository.getExecutions(),
      errorMessage: 'Não foi possível buscar suas execuções.',
    });

  const handleStartExecution = useCallback(
    async (params: TStartExecutionParams) => {
      try {
        setIsLoadingStartExecution(true);
        const execution = await executionRepository.startExecution(params);

        if (!execution) {
          refresh();
          return;
        }

        toast.show('Execução iniciada com sucesso!', {
          type: 'success',
          placement: 'top',
        });

        navigation.navigate('ExecutionDetails', { execution });
      } catch (error) {
        toast.show('Não foi possível criar a inspeção.', {
          type: 'danger',
          placement: 'top',
        });
      } finally {
        setIsLoadingStartExecution(false);
      }
    },
    [executionRepository, navigation, refresh, toast],
  );

  return {
    executions: {
      todo: data?.['em andamento'] ?? [],
      done: data?.finalizado ?? [],
    },
    isLoading,
    isRefetching,
    isPending,
    refetch,
    handleStartExecution,
    isLoadingStartExecution,
  };
};
