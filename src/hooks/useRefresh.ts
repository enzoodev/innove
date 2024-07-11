import { useCallback, useState } from 'react';

type UseRefresh = () => {
  key: number;
  refresh: () => Promise<unknown>;
};

export const useRefresh: UseRefresh = () => {
  const [key, setKey] = useState(0);

  const refresh = useCallback(async () => {
    setKey(prev => prev + 1);
  }, []);

  return { key, refresh };
};
