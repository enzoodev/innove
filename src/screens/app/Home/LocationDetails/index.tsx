import { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import { useChecklists } from '@/hooks/useChecklists';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

import { Button } from '@/components/elements/Button';
import { ListEmptyCard } from '@/components/elements/ListEmptyCard';
import { LayoutBaseHeader } from '@/components/elements/LayoutBaseHeader';
import { RefundDetailsItem } from '@/components/elements/Financial/RefundDetailsItem';
import { RefundDetailsHeader } from '@/components/elements/Financial/RefundDetailsHeader';
import { RefundDetailsSkeletonItem } from '@/components/elements/Financial/RefundDetailsSkeletonItem';

import { RefundLineDetailsModal } from '../RefundLineDetailsModal';
import { UpdateRefundCardLineModal } from './UpdateRefundCardLineModal';

import * as S from './styles';
import { IconEditOff } from 'tabler-react-native/icons';

type Line = {
  id: string;
  paymentType: string;
};

export const LocationDetails = () => {
  const [lineSelected, setLineSelected] = useState<Line>({
    id: '',
    paymentType: 'Cartão Caju',
  });
  const [isOpenUpdateRefundCardLineModal, toggleOpenUpdateRefundCardLineModal] =
    useToggle();
  const [isOpenRefundLineDetailsModal, toggleOpenRefundLineDetailsModal] =
    useToggle();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const route = useRoute();
  const { location } = route.params as TLocationDetails;
  const { toDoChecklists, doneChecklists, isPending, isRefetching, refetch } =
    useChecklists({
      idclient: location.idclient,
      idlocal: location.id,
      idexecution: '',
    });

  const handleOpenRefundDetailsItem = useCallback(
    (item: RefundDetailsType) => {
      setLineSelected({
        id: item.idlinhareembolso,
        paymentType: item.origem,
      });

      if (isFinishedRefund) {
        toggleOpenRefundLineDetailsModal();
      } else {
        const isCashType = item.origem === 'Dinheiro';

        if (isCashType) {
          const hasEditAction = item.action.includes('EDIT');

          if (hasEditAction) {
            navigation.navigate('UpdateRefundCashLine', {
              refundId,
              lineId: item.idlinhareembolso,
            });
          } else {
            toggleOpenRefundLineDetailsModal();
          }
        } else {
          toggleOpenUpdateRefundCardLineModal();
        }
      }
    },
    [
      isFinishedRefund,
      navigation,
      refundId,
      toggleOpenRefundLineDetailsModal,
      toggleOpenUpdateRefundCardLineModal,
    ],
  );

  const handleDeleteRefundLine = useCallback(
    (refund: RefundDetailsType) => {
      setLineSelected({
        id: refund.idlinhareembolso,
        paymentType: refund.origem,
      });

      toggleOpenDeleteRefundLineModal();
    },
    [toggleOpenDeleteRefundLineModal],
  );

  const loadingData = Array.from({ length: 6 }).map((_, index) => ({
    idchecklist: index.toString(),
  }));

  const toDoChecklistsFlatListData = isPending ? loadingData : toDoChecklists;
  const doneChecklistsFlatListData = isPending ? loadingData : doneChecklists;

  const keyExtractor = useCallback((item: TChecklist) => item.idchecklist, []);

  const renderItem: ListRenderItem<TChecklist> = useCallback(
    ({ item, index }) => {
      const isLastItem = flatListData.length === index + 1;

      if (isPending) {
        return <RefundDetailsSkeletonItem isLastItem={isLastItem} />;
      }

      return (
        <RefundDetailsItem
          item={item}
          isLastItem={isLastItem}
          onDeleteRefundLine={() => handleDeleteRefundLine(item)}
          onPress={() => handleOpenRefundDetailsItem(item)}
        />
      );
    },
    [
      flatListData.length,
      handleDeleteRefundLine,
      handleOpenRefundDetailsItem,
      isPending,
    ],
  );

  useRefreshOnFocus(refetch);

  return (
    <S.Container>
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
          paddingBottom: insets.bottom + theme.layout[4],
        }}
        ListHeaderComponent={
          <S.ListHeader>
            <LayoutBaseHeader hasBackButton title="Detalhes da obra" />
            <RefundDetailsHeader refundId={refundId} isLoading={isPending} />
            {flatListData.length > 0 && (
              <S.RefundsHeader>
                <S.RefundType>
                  <S.RefundCash />
                  <S.RefundTitle>Dinheiro</S.RefundTitle>
                </S.RefundType>
                <S.RefundType>
                  <S.RefundCard />
                  <S.RefundTitle>Cartão</S.RefundTitle>
                </S.RefundType>
              </S.RefundsHeader>
            )}
          </S.ListHeader>
        }
        ListFooterComponent={
          <S.ButtonWrapper>
            <Button
              title="Finalizar reembolso"
              onPress={handleFinishRefund}
              isLoading={isLoadingRequest}
              isDisabled={isPending}
            />
          </S.ButtonWrapper>
        }
        ListEmptyComponent={
          <S.ListEmptyWrapper>
            <ListEmptyCard
              title="Nenhum item encontrado."
              Icon={() => (
                <IconEditOff
                  stroke={1.5}
                  size={theme.iconSizes.md}
                  color={theme.colors.textTertiary}
                />
              )}
            />
          </S.ListEmptyWrapper>
        }
      />
      <UpdateRefundCardLineModal
        isOpen={isOpenUpdateRefundCardLineModal}
        onClose={toggleOpenUpdateRefundCardLineModal}
        refundId={refundId}
        lineId={lineSelected.id}
        paymentType={lineSelected.paymentType}
      />
      <RefundLineDetailsModal
        isOpen={isOpenRefundLineDetailsModal}
        onClose={toggleOpenRefundLineDetailsModal}
        id={lineSelected.id}
        paymentType={lineSelected.paymentType}
      />
    </S.Container>
  );
};
