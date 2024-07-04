import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  margin: 0 ${({ theme }) => theme.layout[4]}px;
`;

export const ListHeader = styled.View``;

export const ItemSeparator = styled.View`
  height: ${({ theme }) => theme.border.width.md}px;
  background-color: ${({ theme }) => theme.colors.cardBorderInner};
`;

export const RefundsHeader = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[3]}px;
    margin-top: ${theme.layout[4]}px;
    border-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.cardBorder};
    border-bottom-color: ${theme.colors.cardBorderInner};
    background-color: ${theme.colors.cardBackground};
    border-top-left-radius: ${theme.border.radius.md}px;
    border-top-right-radius: ${theme.border.radius.md}px;
  `};
`;

export const RefundType = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(6)}px;
`;

export const RefundCash = styled.View`
  height: ${RFValue(12)}px;
  width: ${RFValue(12)}px;
  border-radius: ${RFValue(6)}px;
  background-color: ${({ theme }) =>
    theme.colors.financialRefundDetailsItemMoneyColor};
`;

export const RefundCard = styled.View`
  height: ${RFValue(12)}px;
  width: ${RFValue(12)}px;
  border-radius: ${RFValue(6)}px;
  background-color: ${({ theme }) =>
    theme.colors.financialRefundDetailsItemCardColor};
`;

export const RefundTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const ButtonWrapper = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.layout[4]}px;
  `};
`;

export const ListEmptyWrapper = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.layout[4]}px;
  `};
`;
