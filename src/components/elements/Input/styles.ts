import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@/components/elements/Skeleton';

type TContentTypeStyleProps = {
  hasFormError: boolean;
  borderColor: string;
  isOutline: boolean;
  isInModal: boolean;
};

export const Container = styled.View`
  border-radius: ${({ theme }) => theme.border.radius.md}px;
`;

export const Content = styled.View<TContentTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, hasFormError, borderColor, isOutline, isInModal }) => css`
    padding: ${theme.layout[3]}px ${theme.layout[4]}px;
    border-radius: ${theme.border.radius.md}px;
    border-width: ${theme.border.width.md}px;
    border-left-width: ${hasFormError
      ? theme.layout[1]
      : theme.border.width.md}px;
    border-color: ${borderColor};
    ${!isOutline &&
    css`
      background-color: ${isInModal
        ? theme.colors.inputModalBackground
        : theme.colors.inputBackground};
    `}
  `};
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 90%;
    padding: 0;
    border-width: 0;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const InputLoading = styled(Skeleton)`
  height: ${RFValue(42)}px;
  width: 100%;
`;

export const FormError = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.error};
    margin-top: ${theme.layout[2]}px;
  `};
`;
