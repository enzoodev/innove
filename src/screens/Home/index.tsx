import { useAuth } from '@/hooks/useAuth';
import { useLocations } from '@/hooks/useLocations';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { Text, View } from 'react-native';

export const Home = () => {
  const { clientId } = useAuth();
  const { locations, isLoading, isRefetching, refetch } = useLocations({ idclient: clientId });

  useRefreshOnFocus(refetch);

  return (
    <View style={{ padding: 70 }}>
      <Text>Home</Text>
    </View>
  );
};
