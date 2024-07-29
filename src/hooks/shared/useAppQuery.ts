import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';

import { generateQueryKey } from '@/utils/generateQueryKey';
import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage';

import { useFocusNotifyOnChangeProps } from './useFocusNotifyOnChangeProps';
import { useRefresh } from './useRefresh';

type UseAppQueryParams<T = unknown> = {
  request: (params?: Record<string, unknown>) => Promise<T>;
  queryKey: string;
  params?: Record<string, unknown>;
  errorMessage?: string;
};

type UseAppQueryResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  isPending: boolean;
  refresh: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
};

export const useAppQuery = <T>({
  request,
  queryKey,
  params,
  errorMessage = defaultErrorMessage,
}: UseAppQueryParams<T>): UseAppQueryResult<T> => {
  const toast = useToast();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const { key, refresh } = useRefresh();

  const { data, isLoading, refetch, isRefetching } = useQuery<T>({
    queryKey: generateQueryKey(queryKey, key, params),
    queryFn: async () => {
      try {
        return await request(params);
      } catch (error) {
        toast.show(errorMessage, {
          type: 'danger',
          placement: 'top',
        });
        throw error;
      }
    },
    notifyOnChangeProps,
  });

  return {
    data,
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refresh,
    refetch,
  };
};
