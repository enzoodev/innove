import { memo, useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { IconChevronLeft } from 'tabler-react-native/icons';

type Props = TouchableOpacityProps & {
  goBackAll?: boolean;
};

export const GoBackButton = memo(({ goBackAll = false, ...props }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    const action = goBackAll ? StackActions.popToTop() : StackActions.pop(1);
    navigation.dispatch(action);
  }, [goBackAll, navigation]);

  return (
    <TouchableOpacity onPress={handleGoBack} {...props}>
      <IconChevronLeft
        stroke={1.25}
        color={theme.colors.textPrimary}
        size={theme.iconSizes.md}
      />
    </TouchableOpacity>
  );
});
