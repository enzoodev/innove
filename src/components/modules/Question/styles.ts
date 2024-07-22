import styled, { css } from 'styled-components/native';

type ResponseTypeStyleProps = {
  isSelected: boolean;
};

export const Container = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.medium};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const ResponsesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Response = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const ResponseText = styled.Text<ResponseTypeStyleProps>`
  ${({ theme, isSelected }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.xs}px;
    color: ${isSelected
      ? theme.colors.textSecondary
      : theme.colors.textTertiary};
  `};
`;

export const ResponseButton = styled.TouchableOpacity<ResponseTypeStyleProps>`
  align-items: center;
  justify-content: center;
  ${({ theme, isSelected }) => css`
    padding: ${theme.layout[4]}px;
    border-radius: ${theme.border.radius.full}px;
    border-width: ${theme.border.width.lg}px;
    border-color: ${isSelected
      ? theme.colors.textSecondary
      : theme.colors.textTertiary};
  `};
`;
