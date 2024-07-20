import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AppNavigationProp = NativeStackNavigationProp<AppStackParamsList>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
