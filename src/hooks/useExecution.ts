import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useExecution = () => {
  const toast = useToast();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['executions'],
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

  return {
    executions: {
      todo: data?.['em andamento'] ?? [],
      done: data?.finalizado ?? [],
    },
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refetch,
  };
};
