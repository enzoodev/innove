import React, { memo } from 'react';
import { ActivityIndicator, TouchableHighlightProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { shade } from 'polished';

import * as S from './styles';

type Props = TouchableHighlightProps & {
  title: string;
  onPress(): void;
  Icon?: () => JSX.Element;
  color?: string;
  bgColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  itsCancelButton?: boolean;
  isShowSkeleton?: boolean;
};

export const Button = memo(
  ({
    title,
    color,
    bgColor,
    onPress,
    Icon,
    isLoading = false,
    isDisabled = false,
    itsCancelButton = false,
    isShowSkeleton = false,
    ...rest
  }: Props) => {
    const theme = useTheme();
    const buttonBgColor = bgColor || theme.colors.main;
    const buttonTextColor = color || theme.colors.mainContrast;

    if (isShowSkeleton) {
      return <S.SkeletonButton />;
    }

    return (
      <S.Container
        underlayColor={shade(0.2, buttonBgColor)}
        onPress={onPress}
        bgColor={buttonBgColor}
        disabled={isDisabled || isLoading}
        isDisabled={isDisabled}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator color={buttonTextColor} />
        ) : (
          <S.Content>
            <S.Title color={buttonTextColor} itsCancelButton={itsCancelButton}>
              {title}
            </S.Title>
            {!!Icon && <Icon />}
          </S.Content>
        )}
      </S.Container>
    );
  },
);
