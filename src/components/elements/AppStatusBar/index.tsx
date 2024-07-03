import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './styles';

export const AppStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  if (!isFocused) {
    return null;
  }

  return (
    <S.Container paddingTop={insets.top}>
      <StatusBar {...props} />
    </S.Container>
  );
};
