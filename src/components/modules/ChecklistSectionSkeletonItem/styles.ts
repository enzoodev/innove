import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@/components/elements/Skeleton';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.backgroundAlt};
    border-color: ${theme.colors.cardBorderInner};
    border-top-width: ${theme.border.width.md}px;
    border-bottom-width: ${theme.border.width.md}px;
    padding: ${theme.layout[2]}px ${theme.layout[4]}px;
  `};
`;

export const Title = styled(Skeleton)`
  width: 90%;
  height: ${RFValue(50)}px;
`;
