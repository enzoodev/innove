import { ReactNode } from 'react';
import Animated from 'react-native-reanimated';

import { useAnimatedKeyboardStyle } from '@/hooks/shared/useAnimatedKeyboardStyle';

type Props = {
  children: ReactNode;
  keyboardMultiple?: number;
};

export const AnimatedKeyboardWrapper = ({
  children,
  keyboardMultiple,
}: Props) => {
  const translateStyle = useAnimatedKeyboardStyle(keyboardMultiple);

  return <Animated.View style={translateStyle}>{children}</Animated.View>;
};
