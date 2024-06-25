import { memo, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  ViewProps,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconSearch } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = TextInputProps & {
  viewProps?: ViewProps;
  contentViewProps?: ViewProps;
};

export const SearchInput = memo(
  ({ viewProps, contentViewProps, onFocus, onBlur, ...rest }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus],
    );

    const handleBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur],
    );

    return (
      <S.Container {...viewProps}>
        <S.Content
          borderColor={
            isFocused
              ? theme.colors.inputBorderInFocus
              : theme.colors.inputBorder
          }
          {...contentViewProps}
        >
          <S.Input
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.placeholder}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            autoCorrect={false}
            {...rest}
          />
          <IconSearch
            stroke={1.5}
            size={theme.iconSizes.sm}
            color={
              isFocused ? theme.colors.textPrimary : theme.colors.textSecondary
            }
          />
        </S.Content>
      </S.Container>
    );
  },
);
