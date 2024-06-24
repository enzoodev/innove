import { ReactNode, memo } from 'react';
import { TextProps, ViewProps } from 'react-native';

import * as S from './styles';

type Props = ViewProps & {
  title: string;
  children: ReactNode;
  textProps?: TextProps;
  isDisabled?: boolean;
};

export const Label = memo(
  ({ title, textProps, isDisabled = false, children, ...rest }: Props) => {
    return (
      <S.Container isDisabled={isDisabled} {...rest}>
        <S.Title {...textProps}>{title}</S.Title>
        {children}
      </S.Container>
    );
  },
);
