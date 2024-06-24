import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

type ContainerTypeStyleProps = {
  isGray: boolean;
};

export const Container = styled(Animated.View)<ContainerTypeStyleProps>`
  ${({ theme, isGray }) => css`
    border-radius: ${theme.layout[2]}px;
    background-color: ${isGray
      ? theme.colors.skeletonDark
      : theme.colors.skeleton};
  `};
`;
