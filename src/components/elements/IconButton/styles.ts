import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

type ContainerTypeStyleProps = {
  isDisabled: boolean;
};

export const Container = styled(BorderlessButton)<ContainerTypeStyleProps>`
  padding: ${RFValue(6)}px;
  ${({ theme, isDisabled }) => css`
    border-radius: ${theme.border.radius.full}px;
    background-color: ${theme.colors.iconButtonBackground};
    opacity: ${isDisabled ? 0.4 : 1};
  `};
`;
