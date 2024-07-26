import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export type TImageWrapperProps = {
  isLastItem: boolean;
};

const { width } = Dimensions.get('window');

export const ImageWrapper = styled.View<TImageWrapperProps>`
  width: ${width}px;
  ${({ theme, isLastItem }) => css`
    border-bottom-width: ${theme.border.width.md}px;
    border-top-width: ${theme.border.width.md}px;
    border-left-width: ${theme.border.width.md}px;
    border-right-width: ${isLastItem ? theme.border.width.md : 0}px;
    border-color: ${theme.colors.imageWrapperBorderColor};
    background-color: ${theme.colors.imageWrapperBackgroundColor};
  `};
`;

export const ImageHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[1]}px ${theme.layout[4]}px;
    border-bottom-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.imageWrapperBorderColor};
  `};
`;

export const ImageHeaderButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;

export const ImageHeaderTitle = styled.Text`
  ${({ theme }) => css`
    padding: ${theme.layout[1]}px 0;
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const Image = styled.Image`
  flex: 1;
`;

export const ImageEmptyWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
