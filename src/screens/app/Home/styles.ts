import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin: 0 ${({ theme }) => theme.layout[4]}px;
`;

export const ItemSeparator = styled.View`
  margin: ${({ theme }) => theme.layout[2]}px 0;
`;

export const ListHeader = styled.View`
  ${({ theme }) => css`
    padding: ${theme.layout[2]}px ${theme.layout[3]}px;
  `};
`;

export const ListHeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const ListWrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.cardBackground};
    border: ${theme.border.width.md}px solid ${theme.colors.cardBorder};
    border-radius: ${theme.border.radius.md}px;
  `};
`;

export const ListItemsWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[1]}px;
    border-top-width: ${theme.border.width.md}px;
    border-top-color: ${theme.colors.cardBorderInner};
  `};
`;

export const ListEmptyWrapper = styled.View`
  margin: ${({ theme }) => theme.layout[4]}px;
`;
