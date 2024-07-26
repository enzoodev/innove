import { BorderlessButton } from '@/components/elements/BorderlessButton';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

type ResponseTypeStyleProps = {
  isSelected: boolean;
};

const { width } = Dimensions.get('window');

export const Container = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const ResponsesContainerWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
    padding: 0 ${theme.layout[4]}px;
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
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const Response = styled(BorderlessButton)`
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

export const ResponseButton = styled(BorderlessButton)<ResponseTypeStyleProps>`
  align-items: center;
  justify-content: center;
  ${({ theme, isSelected }) => css`
    width: ${theme.layout[6]}px;
    height: ${theme.layout[6]}px;
    border-radius: ${theme.border.radius.full}px;
    border-width: ${theme.border.width.lg}px;
    border-color: ${isSelected
      ? theme.colors.textSecondary
      : theme.colors.textTertiary};
  `};
`;

export const NonConformingContainer = styled.View``;

export const JustificationsContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[2]}px ${theme.layout[4]}px ${theme.layout[4]}px;
  `};
`;

export const ClassificationsContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const ClassificationsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[12]}px;
    margin-top: ${theme.layout[2]}px;
    margin-left: ${theme.layout[4]}px;
  `};
`;

export const Classification = styled(BorderlessButton)`
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const PhotosWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const PhotosScrollView = styled.ScrollView`
  width: ${width}px;
  height: ${({ theme }) => theme.layout[72]}px;
  align-self: center;
`;

export const PhotosFormErrorWrapper = styled.View`
  ${({ theme }) => css`
    margin: 0 ${theme.layout[4]}px;
  `};
`;

export const FormError = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.error};
  `};
`;
