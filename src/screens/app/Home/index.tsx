import { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconLocationOff } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/useAuth';
import { useLocations } from '@/hooks/useLocations';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

import { SearchInput } from '@/components/elements/SearchInput';
import { AppStatusBar } from '@/components/elements/AppStatusBar';
import { ListEmptyCard } from '@/components/elements/ListEmptyCard';
import { AppStatusBar } from '@/components/elements/AppStatusBar';
import { HomeHeader } from '@/components/elements/HomeHeader';
import { LocationItem } from '@/components/modules/LocationItem';
import { LocationSkeletonItem } from '@/components/modules/LocationSkeletonItem';

import * as S from './styles';

export const Home = () => {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { clientId } = useAuth();
  const { locations, isLoading, isRefetching, refetch } = useLocations({
    idclient: clientId,
  });

  const filteredLocations = useMemo(() => {
    if (locations.length === 0) return [];

    return locations.filter(item =>
      item.nome.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [locations, searchText]);

  const handleOpenLocation = useCallback((locationId: number) => {
    console.log('Open location', locationId);
  }, []);

  const loadingData = Array.from({ length: 6 }, (_, index) => ({
    id: index,
  }));

  const isPending = isLoading || isRefetching;

  const flatListData = isPending ? loadingData : filteredLocations;

  const keyExtractor = useCallback((item: TLocation) => item.id.toString(), []);

  const renderItem: ListRenderItem<TLocation> = useCallback(
    ({ item }) => {
      if (isPending) {
        return <LocationSkeletonItem />;
      }

      return (
        <LocationItem item={item} onPress={() => handleOpenLocation(item.id)} />
      );
    },
    [handleOpenLocation, isPending],
  );

  useRefreshOnFocus(refetch);

  return (
    <S.Container>
      <AppStatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
      <S.Content>
        <FlatList
          data={flatListData as []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={S.ItemSeparator}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.textSecondary}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          contentContainerStyle={{
            paddingTop: theme.layout[4],
            paddingBottom: theme.layout[4] + insets.bottom,
          }}
          ListHeaderComponent={
            <S.ListHeader>
              <HomeHeader />
              <S.SearchInputWrapper>
                <SearchInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Buscar local"
                />
              </S.SearchInputWrapper>
            </S.ListHeader>
          }
          ListEmptyComponent={
            <ListEmptyCard
              title="Nenhum local encontrado."
              Icon={() => (
                <IconLocationOff
                  stroke={1.5}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              )}
            />
          }
        />
      </S.Content>
    </S.Container>
  );
};
