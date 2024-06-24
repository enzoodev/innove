import {
  ForwardRefRenderFunction,
  ReactElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
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

export interface RefProps {
  focus: () => void;
}

const InputComponent: ForwardRefRenderFunction<RefProps, Props> = (
  {
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
  },
  ref,
): ReactElement => {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

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

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        return inputRef.current?.focus();
      },
    }),
    [],
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
              ref={inputRef}
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
};

export const Input = forwardRef(InputComponent);
