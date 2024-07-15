import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@/components/elements/Skeleton';

type ButtonProps = {
  bgColor: string;
  borderColor: string;
  isDisabled: boolean;
};

type ButtonTextProps = {
  color: string;
  itsCancelButton: boolean;
};

export const Container = styled.TouchableHighlight<ButtonProps>`
  width: 100%;
  min-height: ${RFValue(42)}px;
  align-items: center;
  justify-content: center;
  ${({ theme, bgColor, borderColor, isDisabled }) => css`
    border-radius: ${theme.border.radius.md}px;
    background-color: ${bgColor};
    border: 1px solid ${borderColor};
    opacity: ${isDisabled ? 0.4 : 1};
  `};
`;

export const SkeletonButton = styled(Skeleton)`
  width: 100%;
  height: ${RFValue(42)}px;
  border-radius: ${({ theme }) => theme.border.radius.md}px;
`;

export const Content = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.layout[3]}px;
`;

export const Title = styled.Text<ButtonTextProps>`
  ${({ theme, color, itsCancelButton }) => css`
    font-family: ${itsCancelButton
      ? theme.fonts.main.regular
      : theme.fonts.main.bold};
    font-size: ${theme.fontSizes.md}px;
    color: ${color};
  `};
`;
