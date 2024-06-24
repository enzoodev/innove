import styled, { css } from 'styled-components/native';

type ContainerTypeStyleProps = {
  isDisabled: boolean;
};

export const Container = styled.View<ContainerTypeStyleProps>`
  flex: 1;
  width: 100%;
  gap: ${({ theme }) => theme.layout[1]}px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;
