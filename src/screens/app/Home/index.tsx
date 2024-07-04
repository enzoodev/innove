import { useCallback, useMemo, useState } from 'react';
import {
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconCircleCheck, IconMapOff } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useExecution } from '@/hooks/useExecution';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

import { SearchInput } from '@/components/elements/SearchInput';
import { AppStatusBar } from '@/components/elements/AppStatusBar';
import { ListEmptyCard } from '@/components/elements/ListEmptyCard';
import { HomeHeader } from '@/components/elements/HomeHeader';
import { ButtonAdd } from '@/components/elements/ButtonAdd';
import { AnimatedButtonAddWrapper } from '@/components/elements/AnimatedButtonAddWrapper';
import { ExecutionItem } from '@/components/modules/ExecutionItem';
import { ExecutionSkeletonItem } from '@/components/modules/ExecutionSkeletonItem';

import * as S from './styles';

export const Home = () => {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const { executions, isRefetching, isPending, refetch } = useExecution();

  const filteredTodoExecutions = useMemo(
    () =>
      executions.todo.filter(item =>
        item.detalhes.nome.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [executions.todo, searchText],
  );

  const filteredDoneExecutions = useMemo(
    () =>
      executions.done.filter(item =>
        item.detalhes.nome.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [executions.done, searchText],
  );

  const handleOpenExecution = useCallback(
    (execution: TExecution) => {
      navigation.navigate('ExecutionDetails', { execution });
    },
    [navigation],
  );

  const handleCreateExecution = useCallback(() => {}, []);

  const drag = useSharedValue(0);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(drag.value, [0, 1], [0, 135], Extrapolate.CLAMP),
            {
              damping: 15,
              stiffness: 200,
              mass: 0.5,
              velocity: 1.3,
            },
          ),
        },
      ],
      opacity: withSpring(1, undefined),
    };
  });

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;

      if (contentOffset.y === 0) {
        drag.value = 1;
      } else {
        drag.value = 0;
      }
    },
    [drag],
  );

  const renderLoadingList = useCallback(() => {
    return Array.from({ length: 6 }, (_, index) => (
      <ExecutionSkeletonItem key={index} />
    ));
  }, []);

  const renderTodoExecutions = useCallback(() => {
    if (isPending) {
      return Array.from({ length: 6 }, (_, index) => (
        <ExecutionSkeletonItem key={index} />
      ));
    }

    if (filteredTodoExecutions.length === 0) {
      return (
        <S.ListEmptyWrapper>
          <ListEmptyCard
            title="Nenhuma execução pendente encontrada."
            Icon={() => (
              <IconCircleCheck
                stroke={1.5}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            )}
          />
        </S.ListEmptyWrapper>
      );
    }

    return filteredTodoExecutions.map(item => (
      <ExecutionItem
        key={item.id}
        item={item}
        onPress={() => handleOpenExecution(item)}
      />
    ));
  }, [
    filteredTodoExecutions,
    handleOpenExecution,
    isPending,
    theme.colors.textSecondary,
    theme.iconSizes.md,
  ]);

  const renderDoneExecutions = useCallback(() => {
    if (isPending) {
      return renderLoadingList();
    }

    if (filteredDoneExecutions.length === 0) {
      return (
        <S.ListEmptyWrapper>
          <ListEmptyCard
            title="Nenhuma execução finalizada encontrada."
            Icon={() => (
              <IconMapOff
                stroke={1.5}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            )}
          />
        </S.ListEmptyWrapper>
      );
    }

    return filteredDoneExecutions.map(item => (
      <ExecutionItem
        key={item.id}
        item={item}
        onPress={() => handleOpenExecution(item)}
      />
    ));
  }, [
    filteredDoneExecutions,
    handleOpenExecution,
    isPending,
    renderLoadingList,
    theme.colors.textSecondary,
    theme.iconSizes.md,
  ]);

  useRefreshOnFocus(refetch);

  return (
    <S.Container>
      <AppStatusBar
        translucent
        // eslint-disable-next-line react/style-prop-object
        style="light"
        backgroundColor={theme.colors.main}
      />
      <S.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.textSecondary}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          contentContainerStyle={{
            gap: theme.layout[4],
            paddingTop: theme.layout[4],
            paddingBottom: theme.layout[4] + insets.bottom,
          }}
        >
          <HomeHeader />
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar execução"
          />
          <S.ListWrapper>
            <S.ListHeader>
              <S.ListHeaderTitle>Execuções pendentes</S.ListHeaderTitle>
            </S.ListHeader>
            <S.ListItemsWrapper>{renderTodoExecutions()}</S.ListItemsWrapper>
          </S.ListWrapper>
          <S.ListWrapper>
            <S.ListHeader>
              <S.ListHeaderTitle>Execuções finalizadas</S.ListHeaderTitle>
            </S.ListHeader>
            <S.ListItemsWrapper>{renderDoneExecutions()}</S.ListItemsWrapper>
          </S.ListWrapper>
        </ScrollView>
        {!isPending && (
          <AnimatedButtonAddWrapper style={buttonAnimatedStyle}>
            <ButtonAdd onPress={handleCreateExecution} />
          </AnimatedButtonAddWrapper>
        )}
      </S.Content>
    </S.Container>
  );
};
