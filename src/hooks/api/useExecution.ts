import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { useAppNavigation } from '../shared/useAppNavigation';
import { useAppQuery } from '../shared/useAppQuery';
import { useRefreshOnFocus } from '../shared/useRefreshOnFocus';

export const useExecution = () => {
  const toast = useToast();
  const navigation = useAppNavigation();

  const { data, isLoading, isPending, isRefetching, refresh, refetch } =
    useAppQuery({
      request: () => ExecutionRepository.getExecutions(),
      queryKey: 'executions',
      errorMessage: 'Não foi possível buscar suas execuções.',
    });

  const { mutateAsync: startExecutionFn, isPending: isLoadingStartExecution } =
    useMutation({
      mutationFn: ExecutionRepository.startExecution,
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
        toast.show('Não foi possível iniciar a execução.', {
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
