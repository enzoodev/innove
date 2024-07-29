import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconRefresh,
  IconSun,
  IconSunOff,
  IconX,
} from 'tabler-react-native/icons';
import { useToast } from 'react-native-toast-notifications';

import { useToggle } from '@/hooks/shared/useToggle';
import { useAppNavigation } from '@/hooks/shared/useAppNavigation';

import { Button } from '@/components/elements/Button';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

import * as S from './styles';

export const TakeChecklistPhoto: React.FC = () => {
  const route = useRoute();
  const { index, limitOfPhotos, setPhoto } =
    route.params as TTakeChecklistPhotoRouteParams;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoadingTakePhoto, setIsLoadingTakePhoto] = useState(false);
  const [isLoadingRequestPermission, setIsLoadingRequestPermission] =
    useState(false);
  const [isFlashActive, toggleFlashActive] = useToggle();
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useTheme();
  const toast = useToast();
  const navigation = useAppNavigation();
  const cameraRef = useRef<CameraView>(null);
  const doubleTapState = useRef(0);
  const doubleTapTimeout = useRef<unknown>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleResetPhoto = useCallback(() => {
    setPhotoUri(null);
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRequestPermission = useCallback(async () => {
    setIsLoadingRequestPermission(true);
    try {
      await requestPermission();
    } finally {
      setIsLoadingRequestPermission(false);
    }
  }, [requestPermission]);

  const handleTakePhoto = useCallback(async () => {
    try {
      setIsLoadingTakePhoto(true);

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        imageType: 'jpg',
      });

      if (!photo) {
        throw new Error();
      }

      setPhotoUri(photo.uri);
    } catch (error) {
      toast.show('Erro ao tirar a foto', {
        type: 'error',
        placement: 'top',
      });
    } finally {
      setIsLoadingTakePhoto(false);
    }
  }, [toast]);

  const handleDoubleTap = useCallback(
    async ({
      nativeEvent,
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (nativeEvent.state === State.ACTIVE) {
        doubleTapState.current += 1;

        if (doubleTapState.current === 1) {
          const timeBetweenTapsInMilliseconds = 400;

          doubleTapTimeout.current = setTimeout(() => {
            doubleTapState.current = 0;
          }, timeBetweenTapsInMilliseconds);
        } else if (doubleTapState.current === 2) {
          await handleTakePhoto();

          doubleTapState.current = 0;
          clearTimeout(doubleTapTimeout.current as number);
        }
      }
    },
    [handleTakePhoto],
  );

  const handleSavePhoto = useCallback(async () => {
    if (!photoUri) {
      return;
    }

    handleGoBack();
    setPhoto(photoUri, currentIndex);
  }, [photoUri, handleGoBack, setPhoto, currentIndex]);

  const handleSavePhotoAndGoToNext = useCallback(() => {
    if (!photoUri || currentIndex === limitOfPhotos - 1) {
      return;
    }

    setPhoto(photoUri, currentIndex);
    setCurrentIndex(prevState => prevState + 1);

    handleResetPhoto();
  }, [photoUri, currentIndex, limitOfPhotos, setPhoto, handleResetPhoto]);

  if (!permission) {
    return (
      <S.LoadingContainer style={StyleSheet.absoluteFill}>
        <ActivityIndicator size="large" color={theme.colors.mailContrast} />
      </S.LoadingContainer>
    );
  }

  if (photoUri) {
    return (
      <S.Image source={{ uri: photoUri }}>
        <SafeAreaView>
          <S.ImageContentWrapper>
            <S.ImageContentHeader>
              <BorderlessButton onPress={handleGoBack}>
                <IconX
                  stroke={1.25}
                  size={theme.iconSizes.lg}
                  color={theme.colors.mainContrast}
                />
              </BorderlessButton>
              <S.Title>
                Foto {currentIndex + 1}/{limitOfPhotos}
              </S.Title>
              <S.ImagesButtonsFullWrapper>
                <S.ImageButtonsWrapper>
                  {currentIndex < limitOfPhotos - 1 && (
                    <S.IconButton onPress={handleSavePhotoAndGoToNext}>
                      <IconChevronRight
                        stroke={1.5}
                        size={theme.iconSizes.md}
                        color={theme.colors.mainContrast}
                      />
                    </S.IconButton>
                  )}
                  <S.IconButton onPress={handleResetPhoto}>
                    <IconRefresh
                      stroke={1.5}
                      size={theme.iconSizes.md}
                      color={theme.colors.mainContrast}
                    />
                  </S.IconButton>
                </S.ImageButtonsWrapper>
                <S.IconButton onPress={handleSavePhoto}>
                  <IconCheck
                    stroke={1.5}
                    size={theme.iconSizes.lg}
                    color={theme.colors.mainContrast}
                  />
                </S.IconButton>
              </S.ImagesButtonsFullWrapper>
            </S.ImageContentHeader>
          </S.ImageContentWrapper>
        </SafeAreaView>
      </S.Image>
    );
  }

  return (
    <S.Container>
      {permission.granted ? (
        <TapGestureHandler onHandlerStateChange={handleDoubleTap}>
          <S.Wrapper>
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              enableTorch={isFlashActive}
              flash={isFlashActive ? 'on' : 'off'}
            />
            <S.WrapperSafeAreaView>
              <S.CameraContentWrapper>
                <S.Header>
                  <S.GoBackButton onPress={handleGoBack}>
                    <IconChevronLeft
                      stroke={1.25}
                      size={theme.iconSizes.lg}
                      color={theme.colors.mainContrast}
                    />
                  </S.GoBackButton>
                  <S.Title>
                    Foto {currentIndex + 1}/{limitOfPhotos}
                  </S.Title>
                  <S.IconButton onPress={toggleFlashActive}>
                    {isFlashActive ? (
                      <IconSunOff
                        stroke={1.5}
                        size={theme.iconSizes.md}
                        color={theme.colors.mainContrast}
                      />
                    ) : (
                      <IconSun
                        stroke={1.5}
                        size={theme.iconSizes.md}
                        color={theme.colors.mainContrast}
                      />
                    )}
                  </S.IconButton>
                </S.Header>
                <TouchableWithoutFeedback
                  onPress={handleTakePhoto}
                  disabled={isLoadingTakePhoto}
                >
                  <S.TakePhotoButton />
                </TouchableWithoutFeedback>
              </S.CameraContentWrapper>
            </S.WrapperSafeAreaView>
            {isLoadingTakePhoto && (
              <S.LoadWrapper>
                <ActivityIndicator size="large" color="#000000" />
              </S.LoadWrapper>
            )}
          </S.Wrapper>
        </TapGestureHandler>
      ) : (
        <S.NoPermissionWrapper>
          <S.GoBackButton onPress={handleGoBack}>
            <IconChevronLeft
              stroke={1.25}
              size={theme.iconSizes.lg}
              color={theme.colors.textPrimary}
            />
          </S.GoBackButton>
          <S.NotPermissionContainer>
            <S.NotPermissionText>
              Forneça permissão para o app Innove acessar sua Câmera.
            </S.NotPermissionText>
            <S.ButtonWrapper>
              <Button
                title="Permitir"
                isLoading={isLoadingRequestPermission}
                onPress={handleRequestPermission}
                color={theme.colors.buttonTextColor}
                bgColor={theme.colors.buttonBackground}
              />
            </S.ButtonWrapper>
          </S.NotPermissionContainer>
        </S.NoPermissionWrapper>
      )}
    </S.Container>
  );
};
