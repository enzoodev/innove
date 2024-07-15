import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    margin: 0 ${theme.layout[2]}px;
  `};
`;

export const IconWrapper = styled.View`
  ${({ theme }) => css`
    padding-bottom: ${theme.layout[4]}px;
  `};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    flex: 1;
    gap: ${theme.layout[1]}px;
    padding-bottom: ${theme.layout[4]}px;
    border-color: ${theme.colors.cardBorderInner};
    border-bottom-width: ${theme.border.width.md}px;
  `};
`;

export const InfoLabel = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const InfoValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.medium};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textPrimary};
  `};
`;
