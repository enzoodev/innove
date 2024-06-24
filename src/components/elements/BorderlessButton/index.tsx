import React, { ReactNode, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  children: ReactNode;
};

export const BorderlessButton = memo(({ children, ...rest }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      {children}
    </TouchableOpacity>
  );
});
