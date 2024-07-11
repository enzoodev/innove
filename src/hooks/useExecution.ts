import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { generateQueryKey } from '@/app/utils/generateQueryKey';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';
import { useRefresh } from './useRefresh';
import { useAppNavigation } from './useAppNavigation';

export const useExecution = () => {
  const toast = useToast();
  const navigation = useAppNavigation();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const { key, refresh } = useRefresh();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: generateQueryKey('executions', key),
    queryFn: async () => {
      try {
        return await ExecutionRepository.getExecutions();
      } catch (error) {
        toast.show('Não foi possível buscar suas execuções.', {
          type: 'danger',
          placement: 'top',
        });
      }
    },
    notifyOnChangeProps,
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

  return {
    executions: {
      todo: data?.['em andamento'] ?? [],
      done: data?.finalizado ?? [],
    },
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refresh,
    refetch,
    handleStartExecution,
    isLoadingStartExecution,
  };
};
