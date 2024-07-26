import React, { memo } from 'react';
import { ViewProps } from 'react-native';

import { GoBackButton } from '@/components/elements/GoBackButton';

import * as S from './styles';

type Props = ViewProps &
  S.ContainerTypeStyleProps & {
    title?: string;
    backButtonLeftSpace?: number;
  };

export const Header = memo(
  ({
    title,
    hasBackButton = false,
    rightComponent,
    backButtonLeftSpace = 0,
    ...rest
  }: Props) => {
    return (
      <S.Container
        hasBackButton={hasBackButton}
        rightComponent={rightComponent}
        {...rest}
      >
        {hasBackButton && (
          <S.GoBackButtonWrapper
            rightComponent={rightComponent}
            backButtonLeftSpace={backButtonLeftSpace}
          >
            <GoBackButton />
          </S.GoBackButtonWrapper>
        )}
        {title && <S.Title hasBackButton={hasBackButton}>{title}</S.Title>}
        {rightComponent}
      </S.Container>
    );
  },
);
