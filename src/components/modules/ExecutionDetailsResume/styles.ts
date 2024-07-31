import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.cardBackground};
    border-color: ${theme.colors.cardBorder};
    border-width: ${theme.border.width.md}px;
    border-radius: ${theme.border.radius.md}px;
  `};
`;

export const Header = styled.View`
  ${({ theme }) => css`
    padding: ${theme.layout[2]}px ${theme.layout[3]}px;
    border-bottom-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.cardBorderInner};
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const InfoContentWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
    padding: ${theme.layout[3]}px;
  `};
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.layout[1]}px;
`;

export const InfoLabel = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const InfoTitle = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;
