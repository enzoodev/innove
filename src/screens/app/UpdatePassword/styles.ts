import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[6]}px;
    margin: ${theme.layout[4]}px;
  `};
`;

export const FormWrapper = styled.View`
  width: 100%;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const RulesWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;

export const Header = styled.View`
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
    margin: ${theme.layout[4]}px 0;
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
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;
