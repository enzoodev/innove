import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

type TContainerTypeTypeProps = {
  isOpen: boolean;
};

export type TImageWrapperProps = {
  isLastItem: boolean;
};

const { width } = Dimensions.get('window');

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.backgroundAlt};
  `};
`;

export const ImageWrapper = styled.View<TImageWrapperProps>`
  width: ${width}px;
  ${({ theme, isLastItem }) => css`
    border-bottom-width: ${theme.border.width.md}px;
    border-left-width: ${theme.border.width.md}px;
    border-right-width: ${isLastItem ? theme.border.width.md : 0}px;
    border-color: ${theme.colors.imageWrapperBorderColor};
  `};
`;

export const Header = styled.View<TContainerTypeTypeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, isOpen }) => css`
    gap: ${theme.layout[3]}px;
    border-color: ${theme.colors.cardBorderInner};
    border-top-width: ${theme.border.width.md}px;
    border-bottom-width: ${theme.border.width.md}px;
    padding: ${theme.layout[isOpen ? 1 : 2]}px ${theme.layout[4]}px;
  `};
`;

export const Title = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
  `};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;

export const PhotosScrollView = styled.ScrollView`
  width: ${width}px;
  height: ${({ theme }) => theme.layout[72]}px;
  align-self: center;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const ImageEmptyWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
