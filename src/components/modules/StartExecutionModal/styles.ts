import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
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
