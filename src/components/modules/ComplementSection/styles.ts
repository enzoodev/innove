import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

type TContainerTypeTypeProps = {
  isOpen: boolean;
};

export type TImageWrapperProps = {
  isLastItem: boolean;
};

const { width } = Dimensions.get('window');

export const Container = styled.View<TContainerTypeTypeProps>`
  ${({ theme, isOpen }) => css`
    border-top-width: ${theme.border.width.md}px;
    border-bottom-width: ${theme.border.width.md}px;
    border-color: ${theme.colors.cardBorderInner};
    background-color: ${isOpen
      ? theme.colors.background
      : theme.colors.backgroundAlt};
  `};
`;

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

export const Header = styled.View<TContainerTypeTypeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, isOpen }) => css`
    gap: ${theme.layout[4]}px;
    border-color: ${theme.colors.imageWrapperBorderColor};
    padding: ${theme.layout[isOpen ? 1 : 2]}px ${theme.layout[4]}px;
  `};
`;

export const Title = styled.Text<TContainerTypeTypeProps>`
  flex: 1;
  ${({ theme, isOpen }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${isOpen ? theme.fontSizes.md : theme.fontSizes.sm}px;
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
