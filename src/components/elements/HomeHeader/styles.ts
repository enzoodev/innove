import styled, { css } from 'styled-components/native';
import { BorderlessButton } from '../BorderlessButton';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const UserTextWrapper = styled.View`
  width: 70%;
`;

export const UserName = styled.Text`
  width: 100%;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const UserNameLabel = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;

export const SyncPhotosButton = styled(BorderlessButton)`
  ${({ theme }) => css`
    padding: ${theme.layout[1] * 1.25}px;
    border-radius: ${theme.border.radius.full}px;
    background-color: ${theme.colors.main};
  `};
`;

export const SettingsButton = styled(BorderlessButton)``;
