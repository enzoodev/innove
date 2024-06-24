import { memo, useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  ViewProps,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { BorderlessButton } from '@/components/elements/BorderlessButton';

import * as S from './styles';

type Props = TextInputProps & {
  viewProps?: ViewProps;
  formError?: string;
  isOutline?: boolean;
  isInModal?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  Icon?: () => JSX.Element;
  onPressIcon?: () => void;
};

export const Input = memo(
  ({
    viewProps,
    formError,
    Icon,
    isOutline = false,
    isInModal = false,
    isLoading = false,
    isDisabled = false,
    onPressIcon,
    onFocus,
    onBlur,
    ...rest
  }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const borderColor = useMemo(() => {
      if (formError) {
        return theme.colors.error;
      }

      if (isFocused) {
        return theme.colors.inputBorderInFocus;
      }

      return theme.colors.inputBorder;
    }, [
      formError,
      isFocused,
      theme.colors.inputBorder,
      theme.colors.error,
      theme.colors.inputBorderInFocus,
    ]);

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
        {isLoading ? (
          <S.InputLoading />
        ) : (
          <>
            <S.Content
              hasFormError={!!formError}
              borderColor={borderColor}
              isOutline={isOutline}
              isInModal={isInModal}
            >
              <S.Input
                placeholderTextColor={theme.colors.placeholder}
                selectionColor={theme.colors.placeholder}
                onFocus={handleFocusInput}
                onBlur={handleBlurInput}
                autoCorrect={false}
                editable={!isDisabled}
                {...rest}
              />
              {Icon && (
                <BorderlessButton onPress={onPressIcon} disabled={!onPressIcon}>
                  <Icon />
                </BorderlessButton>
              )}
            </S.Content>
            {!!formError && <S.FormError>{formError}</S.FormError>}
          </>
        )}
      </S.Container>
    );
  },
);
