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

export const FormWrapper = styled.View`
  width: 100%;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const Header = styled.View``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
    margin-top: ${theme.layout[6]}px;
  `};
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
    margin-top: ${theme.layout[6]}px;
  `};
`;
