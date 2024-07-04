import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/app/Home';
import { ExecutionDetails } from '@/screens/app/Home/ExecutionDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="ExecutionDetails" component={ExecutionDetails} />
    </Navigator>
  );
};
