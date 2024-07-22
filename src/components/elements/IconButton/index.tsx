import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  Icon: () => JSX.Element;
  isDisabled?: boolean;
};

export const IconButton = memo(
  ({ Icon, isDisabled = false, ...rest }: Props) => {
    return (
      <S.Container {...rest} disabled={isDisabled} isDisabled={isDisabled}>
        <Icon />
      </S.Container>
    );
  },
);
