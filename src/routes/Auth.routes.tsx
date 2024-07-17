import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/auth/Login';
import { RecoverAccount } from '@/screens/auth/RecoverAccount';
import { RecoverAccountEmailSent } from '@/screens/auth/RecoverAccountEmailSent';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="RecoverAccount" component={RecoverAccount} />
      <Screen
        name="RecoverAccountEmailSent"
        component={RecoverAccountEmailSent}
      />
    </Navigator>
  );
};
