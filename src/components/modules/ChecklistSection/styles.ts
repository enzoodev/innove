import styled, { css } from 'styled-components/native';

type TContainerTypeTypeProps = {
  isOpen: boolean;
};

export const Container = styled.View<TContainerTypeTypeProps>``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    padding: ${theme.layout[2]}px ${theme.layout[2]}px ${theme.layout[2]}px
      ${theme.layout[4]}px;
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const QuestionsContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;
