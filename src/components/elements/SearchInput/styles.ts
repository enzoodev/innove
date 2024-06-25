import styled, { css } from 'styled-components/native';

type ContentTypeStyleProps = {
  borderColor: string;
};

export const Container = styled.View``;

export const Content = styled.View<ContentTypeStyleProps>`
  flex-direction: row;
  justify-content: center;
  ${({ theme, borderColor }) => css`
    padding: ${theme.layout[3]}px ${theme.layout[4]}px;
    background-color: ${theme.colors.inputBackground};
    border-radius: ${theme.border.radius.md}px;
    border-width: ${theme.border.width.md}px;
    border-left-width: ${theme.border.width.md}px;
    border-color: ${borderColor};
  `};
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 90%;
    padding: 0;
    border-width: 0;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;
