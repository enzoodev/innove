import { memo, useCallback, useMemo, useState } from 'react';
import { ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
} from 'tabler-react-native/icons';
import uuid from 'react-native-uuid';

import { useToggle } from '@/hooks/shared/useToggle';

import { CollapsableContainer } from '@/components/elements/CollapsableContainer';

import * as S from './styles';

export type SelectDropDownItem = {
  label: string;
  value: string;
};

type Props = ViewProps & {
  placeholder: string;
  value: SelectDropDownItem | null;
  items: SelectDropDownItem[];
  onSelectValue: (value: SelectDropDownItem) => void;
  formError?: string;
  isOutline?: boolean;
  isDisabled?: boolean;
  isInModal?: boolean;
  isLoading?: boolean;
};

export const SelectDropDown = memo(
  ({
    placeholder,
    value,
    items,
    onSelectValue,
    formError,
    isOutline = false,
    isDisabled = false,
    isInModal = false,
    isLoading = false,
    ...rest
  }: Props) => {
    const [isOpen, toggleOpen] = useToggle();
    const theme = useTheme();
    const isShowPlaceholder = !value;
    const hasFormError = !!formError;
    const [searchText, setSearchText] = useState('');

    const filteredItems = useMemo(
      () =>
        items.filter(item =>
          item.label.toLowerCase().includes(searchText.toLowerCase()),
        ),
      [items, searchText],
    );

    const handleChangeValue = useCallback(
      (data: SelectDropDownItem) => {
        onSelectValue(data);
        toggleOpen();
        setSearchText('');
      },
      [onSelectValue, toggleOpen],
    );

    const renderItems = useCallback(() => {
      if (filteredItems.length === 0) {
        return <S.ListEmptyTitle>Nenhum item encontrado.</S.ListEmptyTitle>;
      }

      return filteredItems.map(item => {
        const isSelected = item.value === value?.value;

        return (
          <S.Item
            key={uuid.v4().toString()}
            isSelected={isSelected}
            onPress={() => handleChangeValue(item)}
          >
            <S.ItemTitle isSelected={isSelected}>{item.label}</S.ItemTitle>
            {isSelected && (
              <IconCheck
                stroke={1.5}
                size={theme.iconSizes.sm}
                color={theme.colors.textPrimary}
              />
            )}
          </S.Item>
        );
      });
    }, [
      filteredItems,
      handleChangeValue,
      theme.colors.textPrimary,
      theme.iconSizes.sm,
      value,
    ]);

    return (
      <S.FullWrapper {...rest}>
        {isLoading ? (
          <S.SelectLoading />
        ) : (
          <S.Container
            hasFormError={hasFormError}
            isOutline={isOutline}
            isInModal={isInModal}
          >
            <S.Header
              isOpen={isOpen}
              onPress={toggleOpen}
              disabled={isDisabled}
            >
              {isShowPlaceholder ? (
                <S.Placeholder>{placeholder}</S.Placeholder>
              ) : (
                <S.Title>{value.label}</S.Title>
              )}
              {isOpen ? (
                <IconChevronUp
                  stroke={1.25}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              ) : (
                <IconChevronDown
                  stroke={1.25}
                  size={theme.iconSizes.md}
                  color={theme.colors.textSecondary}
                />
              )}
            </S.Header>
            <CollapsableContainer isExpanded={isOpen}>
              <S.Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: theme.layout[4],
                  paddingTop: theme.layout[4],
                  paddingBottom: theme.layout[2],
                }}
                nestedScrollEnabled
              >
                <S.SearchInput
                  placeholderTextColor={theme.colors.placeholder}
                  selectionColor={theme.colors.placeholder}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Buscar..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
                {renderItems()}
              </S.Content>
            </CollapsableContainer>
          </S.Container>
        )}
        {hasFormError && <S.FormError>{formError}</S.FormError>}
      </S.FullWrapper>
    );
  },
);
