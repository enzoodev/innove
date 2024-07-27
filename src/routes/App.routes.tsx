import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/app/Home';
import { Settings } from '@/screens/app/Settings';
import { ExecutionDetails } from '@/screens/app/Home/ExecutionDetails';
import { UpdatePassword } from '@/screens/app/UpdatePassword';
import { Checklist } from '@/screens/app/Home/ExecutionDetails/Checklist';
import { TakeChecklistPhoto } from '@/screens/app/Home/ExecutionDetails/Checklist/TakeChecklistPhoto';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="UpdatePassword" component={UpdatePassword} />
      <Screen name="Settings" component={Settings} />
      <Screen name="ExecutionDetails" component={ExecutionDetails} />
      <Screen name="Checklist" component={Checklist} />
      <Screen name="TakeChecklistPhoto" component={TakeChecklistPhoto} />
    </Navigator>
  );
};
