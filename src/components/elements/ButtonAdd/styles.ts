import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

type Props = {
  size: number;
  isDisabled: boolean;
};

export const Container = styled(BorderlessButton)<Props>`
  align-items: center;
  justify-content: center;
  width: ${({ size }) => RFValue(size)}px;
  height: ${({ size }) => RFValue(size)}px;
  background-color: ${({ theme }) => theme.colors.main};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  border-radius: ${({ theme }) => theme.border.radius.full}px;
  shadow-opacity: 0.7;
  shadow-color: #000000;
  shadow-offset: ${RFValue(0.2)}px ${RFValue(0.2)}px;
`;
