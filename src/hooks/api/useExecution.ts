import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';

import { ExecutionRepository } from '@/infrastructure/repositories/api/ExecutionRepository';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import { useAppQuery } from '@/hooks/shared/useAppQuery';
import { useRefreshOnFocus } from '@/hooks/shared/useRefreshOnFocus';
import { useAuth } from '@/hooks/api/useAuth';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useExecution = () => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const { handleCleanAuth } = useAuth();

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const baseRepository = new BaseRepository(httpServices, new UrlBuilder());
  const executionRepository = new ExecutionRepository(baseRepository);

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useAppQuery({
      request: () => executionRepository.getExecutions(),
      queryKey: 'executions',
      errorMessage: 'Não foi possível buscar suas execuções.',
    });

  const { mutateAsync: startExecutionFn, isPending: isLoadingStartExecution } =
    useMutation({
      mutationFn: executionRepository.startExecution,
    });

  const handleStartExecution = useCallback(
    async (params: TStartExecutionParams) => {
      try {
        const execution = await startExecutionFn(params);

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
      }
    },
    [navigation, refresh, startExecutionFn, toast],
  );

  useRefreshOnFocus(refresh);

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
