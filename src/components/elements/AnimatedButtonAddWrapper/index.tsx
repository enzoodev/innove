import { memo } from 'react';
import { ViewProps } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as S from './styles';

export const AnimatedButtonAddWrapper = memo(
  ({ children, ...rest }: AnimateProps<ViewProps>) => {
    const { bottom } = useSafeAreaInsets();

    return (
      <S.AnimatedContainer bottom={bottom} {...rest}>
        {children}
      </S.AnimatedContainer>
    );
  },
);
