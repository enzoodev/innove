import styled, { css } from 'styled-components/native';

type ContentTypeStyleProps = {
  hasFormError: boolean;
  borderColor: string;
};

export const Container = styled.View`
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius.md}px;
`;

export const Content = styled.View<ContentTypeStyleProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, hasFormError, borderColor }) => css`
    padding: ${theme.layout[3]}px ${theme.layout[4]}px;
    border-radius: ${theme.border.radius.md}px;
    border-width: ${theme.border.width.md}px;
    border-left-width: ${hasFormError
      ? theme.layout[1]
      : theme.border.width.md}px;
    border-color: ${borderColor};
    background-color: ${theme.colors.inputBackground};
  `};
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 80%;
    border-width: 0;
    padding: 0;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const FormError = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.error};
    margin-top: ${theme.layout[2]}px;
  `};
`;
