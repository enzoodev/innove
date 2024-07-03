import { useQuery } from '@tanstack/react-query';
import { ExecutionRepository } from '@/app/repositories/api/ExecutionRepository';
import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';

export const useExecution = () => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['executions'],
    queryFn: async () => {
      try {
        return await ExecutionRepository.getExecutions();
      } catch (error) {
        // toast.error('Não foi possível buscar seus dados.');
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
