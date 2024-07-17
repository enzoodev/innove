import React, { memo } from 'react';
import { ViewProps } from 'react-native';

import { GoBackButton } from '@/components/elements/GoBackButton';

import * as S from './styles';

type Props = ViewProps &
  S.ContainerTypeStyleProps & {
    title?: string;
  };

export const Header = memo(
  ({ title, hasBackButton = false, rightComponent, ...rest }: Props) => {
    return (
      <S.Container
        hasBackButton={hasBackButton}
        rightComponent={rightComponent}
        {...rest}
      >
        {hasBackButton && (
          <S.GoBackButtonWrapper rightComponent={rightComponent}>
            <GoBackButton />
          </S.GoBackButtonWrapper>
        )}
        {title && <S.Title hasBackButton={hasBackButton}>{title}</S.Title>}
        {rightComponent}
      </S.Container>
    );
  },
);
