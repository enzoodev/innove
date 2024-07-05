import { ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

export type ContainerTypeStyleProps = {
  hasBackButton?: boolean;
  rightComponent?: ReactNode;
};

export type GoBackButtonTypeStyleProps = {
  rightComponent?: ReactNode;
};

type TitleTypeStyleProps = {
  hasBackButton?: boolean;
};

export const Container = styled.View<ContainerTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  ${({ theme, hasBackButton, rightComponent }) => css`
    padding: ${theme.layout[4]}px 0;
    ${hasBackButton &&
    !!rightComponent &&
    css`
      justify-content: space-between;
    `}
    ${hasBackButton &&
    !rightComponent &&
    css`
      justify-content: center;
    `}
    ${!hasBackButton &&
    !!rightComponent &&
    css`
      justify-content: space-between;
    `}
    ${!hasBackButton &&
    !rightComponent &&
    css`
      justify-content: flex-start;
    `}
  `};
`;

export const Title = styled.Text<TitleTypeStyleProps>`
  ${({ theme, hasBackButton }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${hasBackButton ? theme.fontSizes.lg : theme.fontSizes.xl}px;
    color: ${theme.colors.textPrimary};
  `}
`;

export const GoBackButton = styled(
  BorderlessButton,
)<GoBackButtonTypeStyleProps>`
  ${({ rightComponent }) =>
    !rightComponent &&
    css`
      position: absolute;
      left: 0;
      top: ${RFValue(14)}px;
    `};
`;
