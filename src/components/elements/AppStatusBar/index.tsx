import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

export const AppStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return <StatusBar {...props} />;
};
