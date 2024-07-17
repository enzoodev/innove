import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/auth/Login';
import { RecoverAccount } from '@/screens/auth/RecoverAccount';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="RecoverAccount" component={RecoverAccount} />
    </Navigator>
  );
};
