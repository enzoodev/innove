import { memo, useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  ViewProps,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconEye, IconEyeOff } from 'tabler-react-native/icons';

import { BorderlessButton } from '@/components/elements/BorderlessButton';

import * as S from './styles';

type Props = TextInputProps & {
  viewProps?: ViewProps;
  formError?: string;
};

export const PasswordInput = memo(
  ({ viewProps, formError, onFocus, onBlur, ...rest }: Props) => {
    const [isPasswordType, setIsPasswordType] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleToggleIsPasswordType = useCallback(() => {
      setIsPasswordType(prevState => !prevState);
    }, []);

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
        <S.Content hasFormError={!!formError} borderColor={borderColor}>
          <S.Input
            autoCapitalize="none"
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.placeholder}
            secureTextEntry={isPasswordType}
            autoCorrect={false}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            {...rest}
          />
          <BorderlessButton onPress={handleToggleIsPasswordType}>
            {isPasswordType ? (
              <IconEye
                stroke={1.25}
                size={theme.iconSizes.sm}
                color={theme.colors.textSecondary}
              />
            ) : (
              <IconEyeOff
                stroke={1.25}
                size={theme.iconSizes.sm}
                color={theme.colors.textSecondary}
              />
            )}
          </BorderlessButton>
        </S.Content>
        {!!formError && <S.FormError>{formError}</S.FormError>}
      </S.Container>
    );
  },
);
