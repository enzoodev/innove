import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[4]}px;
    border-radius: ${theme.layout[2]}px;
    background-color: ${theme.colors.backgroundDark};
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;
