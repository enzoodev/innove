import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/app/Home';
import { Settings } from '@/screens/app/Settings';
import { ExecutionDetails } from '@/screens/app/Home/ExecutionDetails';
import { UpdatePassword } from '@/screens/app/UpdatePassword';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="UpdatePassword" component={UpdatePassword} />
      <Screen name="Settings" component={Settings} />
      <Screen name="ExecutionDetails" component={ExecutionDetails} />
    </Navigator>
  );
};
