import { memo, useState, ReactNode, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './styles';

type Props = {
  children: ReactNode;
  isExpanded: boolean;
};

export const CollapsableContainer = memo(({ children, isExpanded }: Props) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const onLayoutHeight = event.nativeEvent.layout.height;

      if (onLayoutHeight > 0 && height !== onLayoutHeight) {
        setHeight(onLayoutHeight);
      }
    },
    [height],
  );

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = isExpanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [isExpanded, height]);

  return (
    <Animated.View style={[collapsableStyle, { overflow: 'hidden', flex: 1 }]}>
      <S.ContentWrapper onLayout={onLayout}>{children}</S.ContentWrapper>
    </Animated.View>
  );
});
