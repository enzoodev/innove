import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.layout[8]}px;
  `};
`;

export const UserInfoContentWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    margin: ${theme.layout[10]}px 0 ${theme.layout[12]}px;
  `};
`;

export const UserPhotoWrapper = styled.View`
  align-self: center;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const UserName = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const ActionButtonsWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;
