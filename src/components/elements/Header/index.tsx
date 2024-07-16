import React, { memo, useCallback } from 'react';
import { ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconChevronLeft } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = ViewProps &
  S.ContainerTypeStyleProps & {
    title?: string;
  };

export const Header = memo(
  ({ title, hasBackButton = false, rightComponent, ...rest }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    return (
      <S.Container
        hasBackButton={hasBackButton}
        rightComponent={rightComponent}
        {...rest}
      >
        {hasBackButton && (
          <S.GoBackButton
            onPress={handleGoBack}
            rightComponent={rightComponent}
          >
            <IconChevronLeft
              stroke={1.25}
              color={theme.colors.textPrimary}
              size={theme.iconSizes.md}
            />
          </S.GoBackButton>
        )}
        {title && <S.Title hasBackButton={hasBackButton}>{title}</S.Title>}
        {rightComponent}
      </S.Container>
    );
  },
);
