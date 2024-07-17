import styled, { css } from 'styled-components/native';

export type TTypeStyleProps = {
  isSatisfied: boolean;
};

export const Container = styled.View<TTypeStyleProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  ${({ theme, isSatisfied }) => css`
    gap: ${theme.layout[2]}px;
    opacity: ${isSatisfied ? 1 : 0.7};
  `};
`;

export const IconWrapper = styled.View<TTypeStyleProps>`
  ${({ theme, isSatisfied }) => css`
    align-items: center;
    justify-content: center;
    width: ${theme.layout[6]}px;
    height: ${theme.layout[6]}px;
    border-radius: ${theme.border.radius.full}px;
    background-color: ${isSatisfied
      ? theme.colors.passwordRuleBg
      : theme.colors.cardBodyButtonBackgroundColor};
  `};
`;

export const Title = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.xs}px;
    color: ${theme.colors.textSecondary};
  `};
`;
