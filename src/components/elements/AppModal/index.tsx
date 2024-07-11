import React, { ReactNode, memo, useCallback } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconX } from 'tabler-react-native/icons';
import Modal from 'react-native-modal';

import { BorderlessButton } from '@/components/elements/BorderlessButton';

import * as S from './styles';

type Props = S.ContainerTypeStyleProps &
  S.TitleTypeStyleProps & {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    scrollViewProps?: ScrollViewProps;
    rightComponent?: ReactNode;
    isShowCloseButton?: boolean;
    closeOnPressOut?: boolean;
  };

export const AppModal = memo(
  ({
    title,
    isOpen,
    onClose,
    children,
    modalHeight,
    modalMaxHeight,
    scrollViewProps,
    rightComponent,
    isShowCloseButton = true,
    closeOnPressOut = true,
    fontSize,
    ...rest
  }: Props) => {
    const theme = useTheme();
    const hasRightComponent = !!rightComponent;

    const handleBackdropPress = useCallback(() => {
      if (closeOnPressOut) {
        onClose();
      }
    }, [closeOnPressOut, onClose]);

    return (
      <Modal
        {...rest}
        isVisible={isOpen}
        onBackdropPress={handleBackdropPress}
        avoidKeyboard
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: theme.layout[1],
          marginBottom: 0,
        }}
      >
        <S.Container modalHeight={modalHeight} modalMaxHeight={modalMaxHeight}>
          <S.Header>
            <S.Title fontSize={fontSize}>{title}</S.Title>
            <S.HeaderRightComponentWrapper>
              {hasRightComponent && rightComponent}
              {isShowCloseButton && (
                <BorderlessButton onPress={onClose}>
                  <IconX
                    stroke={1.5}
                    color={theme.colors.textPrimary}
                    size={theme.iconSizes.md}
                  />
                </BorderlessButton>
              )}
            </S.HeaderRightComponentWrapper>
          </S.Header>
          <ScrollView
            contentContainerStyle={{ paddingBottom: theme.layout[3] }}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        </S.Container>
      </Modal>
    );
  },
);
