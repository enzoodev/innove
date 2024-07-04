import styled, { css } from 'styled-components/native';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

export const Container = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
    padding: ${theme.layout[3]}px;
  `};
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `};
`;

export const IconWrapper = styled.View`
  align-self: flex-start;
  ${({ theme }) => css`
    padding: ${theme.layout[2]}px;
    background-color: ${theme.colors.mainLight};
    border-radius: ${theme.border.radius.full}px;
  `};
`;

export const InfoWrapper = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
    margin-bottom: ${theme.layout[1]}px;
  `};
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const Execution = styled.View`
  align-self: flex-start;
  ${({ theme }) => css`
    border-radius: ${theme.border.radius.full}px;
    padding: ${theme.layout[1] / 2}px ${theme.layout[2]}px;
    background-color: ${theme.colors.backgroundDark};
    margin: ${theme.layout[2]}px 0;
  `};
`;

export const ExecutionText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.xs}px;
    color: ${theme.colors.textTertiary};
  `};
`;
export const ExecutionInfoWrapper = styled.View`
  flex: 1;
  ${({ theme }) => css`
    gap: ${theme.layout[1]}px;
  `};
`;

export const ExecutionInfoTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const ExecutionInfoSubtitle = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;
