import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

type AnimatedContainerTypeStyleProps = {
  bottom: number;
};

export const AnimatedContainer = styled(
  Animated.View,
)<AnimatedContainerTypeStyleProps>`
  z-index: 1;
  ${({ theme, bottom }) => css`
    position: absolute;
    bottom: ${bottom + theme.layout[4]}px;
    right: 0;
  `}
`;
