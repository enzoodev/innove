import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const IconWrapper = styled.View<{ isSatisfied: boolean }>`
  ${({ theme, isSatisfied }) => css`
    align-items: center;
    justify-content: center;
    width: ${theme.layout[8]}px;
    height: ${theme.layout[8]}px;
    border-radius: ${theme.border.radius.full}px;
    background-color: ${isSatisfied
      ? theme.colors.successLight
      : theme.colors.errorLight};
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
    margin-top: ${theme.layout[6]}px;
  `};
`;
