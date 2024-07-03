import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@/components/elements/Skeleton';

export const Container = styled.View`
  flex-direction: row;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
    padding: ${theme.layout[3]}px;
    background-color: ${theme.colors.cardBackground};
    border-radius: ${theme.border.radius.md}px;
    border: ${theme.border.width.md}px solid ${theme.colors.cardBorder};
  `};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const Icon = styled(Skeleton)`
  ${({ theme }) => css`
    width: ${theme.layout[10]}px;
    height: ${theme.layout[10]}px;
    border-radius: ${theme.border.radius.full}px;
  `};
`;

export const Title = styled(Skeleton)`
  width: ${RFValue(150)}px;
  height: ${RFValue(13)}px;
`;

export const Text = styled(Skeleton)`
  width: ${RFValue(120)}px;
  height: ${RFValue(11)}px;
`;
