import styled, { css } from 'styled-components/native';

type TContainerTypeTypeProps = {
  isOpen: boolean;
};

export const Container = styled.View<TContainerTypeTypeProps>`
  ${({ theme, isOpen }) => css`
    border-top-width: ${theme.border.width.md}px;
    border-bottom-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.cardBorderInner};
    background-color: ${isOpen
      ? theme.colors.background
      : theme.colors.backgroundAlt};
  `};
`;

export const Header = styled.View<TContainerTypeTypeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, isOpen }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[isOpen ? 4 : 2]}px ${theme.layout[4]}px;
  `};
`;

export const Title = styled.Text<TContainerTypeTypeProps>`
  flex: 1;
  ${({ theme, isOpen }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.sm}px;
    color: ${isOpen ? theme.colors.textPrimary : theme.colors.textSecondary};
  `};
`;

export const QuestionsContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding-bottom: ${theme.layout[4]}px;
  `};
`;
