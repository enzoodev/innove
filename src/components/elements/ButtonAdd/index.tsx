import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconPlus } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  iconSize?: number;
  size?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const ButtonAdd = memo(
  ({
    iconSize,
    size = 52,
    isLoading = false,
    isDisabled = false,
    ...rest
  }: Props) => {
    const theme = useTheme();

    return (
      <S.Container
        size={size}
        disabled={isDisabled || isLoading}
        isDisabled={isDisabled}
        activeOpacity={0.8}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.background} size="large" />
        ) : (
          <IconPlus
            stroke={1.5}
            size={iconSize || theme.iconSizes.lg}
            color={theme.colors.mainContrast}
          />
        )}
      </S.Container>
    );
  },
);
