import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage';

import { useRefresh } from './useRefresh';

type UseFetchParams<T = unknown> = {
  request: () => Promise<T>;
  errorMessage?: string;
};

type UseFetchResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  isPending: boolean;
  refresh: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
};

export const useFetch = <T>({
  request,
  errorMessage = defaultErrorMessage,
}: UseFetchParams<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const { key, refresh } = useRefresh();
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const response = await request();
      setData(response);
    } catch (error) {
      toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
      });
    }
  }, [errorMessage, request, toast]);

  const fetchDataOnMount = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchData();
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const refetch = useCallback(async () => {
    try {
      setIsRefetching(true);
      await fetchData();
    } finally {
      setIsRefetching(false);
    }
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      fetchDataOnMount();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]),
  );

  return {
    data,
    isLoading,
    isRefetching,
    isPending: isLoading || isRefetching,
    refresh,
    refetch,
  };
};
