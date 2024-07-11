import { useCallback, useState } from 'react';

type UseToggle = (
  initialState?: boolean,
) => [state: boolean, toggle: () => void];

export const useToggle: UseToggle = initialState => {
  const [state, setState] = useState(initialState || false);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle];
};
