import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconCircleCheck, IconThumbDown } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { useChecklists } from '@/hooks/useChecklists';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

import { Button } from '@/components/elements/Button';
import { ListEmptyCard } from '@/components/elements/ListEmptyCard';
import { ListSeparators } from '@/app/utils/ListSeparators';
import { Header } from '@/components/elements/Header';
import { ChecklistItem } from '@/components/modules/ChecklistItem';
import { ChecklistSkeletonItem } from '@/components/modules/ChecklistSkeletonItem';

import * as S from './styles';

export const ExecutionDetails = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const route = useRoute();
  const { execution } = route.params as TExecutionDetailsRouteParams;
  const {
    toDoChecklists,
    doneChecklists,
    isPending,
    isRefetching,
    refresh,
    refetch,
    handleFinishExecution,
    isLoadingFinishExecution,
  } = useChecklists({
    idclient: execution.idclient,
    idexecution: execution.id,
    idlocal: execution.detalhes.id,
  });

  const handleOpenChecklistItem = useCallback(
    (item: TChecklist) => {
      navigation.navigate('Checklist', {
        checklistId: item.idchecklist,
        locationId: execution.detalhes.id,
      });
    },
    [execution.detalhes.id, navigation],
  );

  const renderLoadingList = useCallback(() => {
    return Array.from({ length: 6 }).map((_, index, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(index, array);
      return (
        <S.ItemWrapper key={String(index + 1)}>
          <ChecklistSkeletonItem />
          {hasSeparator && <S.ItemSeparator />}
        </S.ItemWrapper>
      );
    });
  }, []);

  const renderTodoChecklists = useCallback(() => {
    if (isPending) {
      return renderLoadingList();
    }

    if (toDoChecklists.length === 0) {
      return (
        <S.ListEmptyWrapper>
          <ListEmptyCard
            title="Nenhum checklist pendente encontrado."
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

    return toDoChecklists.map((item, index, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(index, array);
      return (
        <S.ItemWrapper key={item.idchecklist}>
          <ChecklistItem
            item={item}
            onPress={() => handleOpenChecklistItem(item)}
          />
          {hasSeparator && <S.ItemSeparator />}
        </S.ItemWrapper>
      );
    });
  }, [
    isPending,
    toDoChecklists,
    renderLoadingList,
    theme.iconSizes.md,
    theme.colors.textSecondary,
    handleOpenChecklistItem,
  ]);

  const renderDoneChecklists = useCallback(() => {
    if (isPending) {
      return renderLoadingList();
    }

    if (doneChecklists.length === 0) {
      return (
        <S.ListEmptyWrapper>
          <ListEmptyCard
            title="Nenhum checklist finalizado encontrado."
            Icon={() => (
              <IconThumbDown
                stroke={1.5}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            )}
          />
        </S.ListEmptyWrapper>
      );
    }

    return doneChecklists.map((item, index, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(index, array);
      return (
        <S.ItemWrapper key={item.idchecklist}>
          <ChecklistItem item={item} />
          {hasSeparator && <S.ItemSeparator />}
        </S.ItemWrapper>
      );
    });
  }, [
    doneChecklists,
    isPending,
    renderLoadingList,
    theme.colors.textSecondary,
    theme.iconSizes.md,
  ]);

  useRefreshOnFocus(refresh);

  return (
    <S.Container>
      <S.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.textSecondary}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          contentContainerStyle={{
            gap: theme.layout[4],
            paddingBottom: insets.bottom + theme.layout[4],
          }}
        >
          <Header hasBackButton title="Detalhes da execução" />
          <S.ListWrapper>
            <S.ListHeader>
              <S.ListHeaderTitle>Checklists pendentes</S.ListHeaderTitle>
            </S.ListHeader>
            <S.ListItemsWrapper>{renderTodoChecklists()}</S.ListItemsWrapper>
          </S.ListWrapper>
          <S.ListWrapper>
            <S.ListHeader>
              <S.ListHeaderTitle>Checklists finalizadas</S.ListHeaderTitle>
            </S.ListHeader>
            <S.ListItemsWrapper>{renderDoneChecklists()}</S.ListItemsWrapper>
          </S.ListWrapper>
          <Button
            title="Finalizar execução"
            onPress={handleFinishExecution}
            isLoading={isLoadingFinishExecution}
            isDisabled={isPending}
          />
        </ScrollView>
      </S.Content>
    </S.Container>
  );
};
