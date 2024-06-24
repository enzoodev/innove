import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamsList>;

export const useAuthNavigation = () => useNavigation<AuthNavigationProp>();
