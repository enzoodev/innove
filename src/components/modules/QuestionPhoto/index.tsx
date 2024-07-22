import { memo, useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  IconCamera,
  IconCameraOff,
  IconTrash,
} from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';

import { IconButton } from '@/components/elements/IconButton';
import * as S from './styles';

type Props = S.TImageWrapperProps & {
  uri: string;
  index: number;
  setPhoto: (uri: string) => Promise<void>;
  deletePhoto: () => void;
};

export const QuestionPhoto = memo(
  ({ uri, index, isLastItem, setPhoto, deletePhoto }: Props) => {
    const hasPhoto = uri.trim().length > 0;
    const theme = useTheme();
    const navigation = useAppNavigation();

    const handleTakePhoto = useCallback(() => {
      navigation.navigate('TakeChecklistPhoto', {
        setPhoto,
      });
    }, [navigation, setPhoto]);

    return (
      <S.ImageWrapper isLastItem={isLastItem}>
        <S.ImageHeader>
          <S.ImageHeaderTitle>Foto {index + 1}/10</S.ImageHeaderTitle>
          <S.ImageHeaderButtonsWrapper>
            <IconButton
              onPress={handleTakePhoto}
              Icon={() => (
                <IconCamera
                  stroke={1.5}
                  size={theme.iconSizes.sm}
                  color={theme.colors.textSecondary}
                />
              )}
            />
            <IconButton
              disabled={!hasPhoto}
              onPress={deletePhoto}
              Icon={() => (
                <IconTrash
                  stroke={1.5}
                  size={theme.iconSizes.sm}
                  color={theme.colors.textSecondary}
                />
              )}
            />
          </S.ImageHeaderButtonsWrapper>
        </S.ImageHeader>
        {hasPhoto ? (
          <S.Image
            resizeMode="cover"
            resizeMethod="resize"
            source={{
              uri,
            }}
          />
        ) : (
          <TouchableWithoutFeedback onPress={handleTakePhoto}>
            <S.ImageEmptyWrapper>
              <IconCameraOff
                stroke={1.5}
                size={theme.layout[32]}
                color={theme.colors.textTertiary}
              />
            </S.ImageEmptyWrapper>
          </TouchableWithoutFeedback>
        )}
      </S.ImageWrapper>
    );
  },
);
