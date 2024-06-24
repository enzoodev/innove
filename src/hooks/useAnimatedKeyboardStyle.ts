import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

export const useAnimatedKeyboardStyle = (keyboardMultiple = 0.5) => {
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value * keyboardMultiple }],
    flex: 1,
  }));

  return translateStyle;
};
