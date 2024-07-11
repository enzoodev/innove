import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@/components/elements/BorderlessButton';
import { Skeleton } from '@/components/elements/Skeleton';

type ContainerTypeStyleProps = {
  hasFormError: boolean;
  isOutline: boolean;
  isInModal: boolean;
};

type HeaderTypeStyleProps = {
  isOpen: boolean;
};

type ItemTypeStyleProps = {
  isSelected: boolean;
};

export const FullWrapper = styled.View``;

export const Container = styled.View<ContainerTypeStyleProps>`
  justify-content: center;
  ${({ theme, hasFormError, isOutline, isInModal }) => css`
    border-radius: ${theme.border.radius.md}px;
    border-width: ${theme.border.width.md}px;
    border-left-width: ${hasFormError
      ? theme.layout[1]
      : theme.border.width.md}px;
    border-color: ${hasFormError
      ? theme.colors.error
      : theme.colors.inputBorder};
    ${!isOutline &&
    css`
      background-color: ${isInModal
        ? theme.colors.inputModalBackground
        : theme.colors.inputBackground};
    `}
  `};
`;

export const Header = styled(BorderlessButton)<HeaderTypeStyleProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, isOpen }) => css`
    height: ${theme.layout[12]}px;
    gap: ${theme.layout[1]}px;
    padding: 0 ${theme.layout[4]}px;
    ${isOpen &&
    css`
      border-bottom-width: ${theme.border.width.md}px;
      border-color: ${theme.colors.inputBorder};
    `};
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const Placeholder = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.placeholder};
  `};
`;

export const Content = styled.ScrollView`
  ${({ theme }) => css`
    max-height: ${theme.layout[24]}px;
  `};
`;

export const Item = styled(BorderlessButton)<ItemTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    margin-bottom: ${theme.layout[2]}px;
  `};
`;

export const ItemTitle = styled.Text<ItemTypeStyleProps>`
  ${({ theme, isSelected }) => css`
    font-family: ${isSelected
      ? theme.fonts.main.medium
      : theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${isSelected
      ? theme.colors.textPrimary
      : theme.colors.textSecondary};
  `};
`;

export const ListEmptyTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const FormError = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.error};
    margin-top: ${theme.layout[2]}px;
  `};
`;

export const SelectLoading = styled(Skeleton)`
  height: ${RFValue(42)}px;
  width: 100%;
`;

export const SearchInput = styled.TextInput`
  padding: 0;
  ${({ theme }) => css`
    padding-bottom: ${theme.layout[2]}px;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.searchText};
  `};
`;
