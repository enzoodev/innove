import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    padding: ${theme.layout[4]}px;
  `};
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
    padding: ${theme.layout[4]}px;
    border-top-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.cardBorderInner};
  `};
`;

export const Quantity = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.medium};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;
