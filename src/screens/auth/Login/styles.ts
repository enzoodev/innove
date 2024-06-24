import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[8]}px;
    margin: 0 ${theme.layout[4]}px;
  `};
`;

export const ForgotPassword = styled.Text`
  ${({ theme }) => css`
    text-decoration: underline;
    font-family: ${theme.fonts.main.medium};
    font-size: ${theme.fontSizes.xs}px;
    color: ${theme.colors.textTertiary};
    margin-top: ${theme.layout[6]}px;
  `};
`;

export const FormWrapper = styled.View`
  width: 100%;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
    margin-top: ${theme.layout[6]}px;
  `};
`;
