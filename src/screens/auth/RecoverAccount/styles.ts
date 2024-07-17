import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[6]}px;
    margin: ${theme.layout[8]}px ${theme.layout[4]}px;
  `};
`;

export const Header = styled.View`
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    margin-top: ${theme.layout[4]}px;
  `};
`;

export const Title = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.xl}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const Subtitle = styled.Text`
  width: 90%;
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const ImageWrapper = styled.View`
  align-items: center;
  ${({ theme }) => css`
    margin: ${theme.layout[4]}px 0;
  `};
`;
