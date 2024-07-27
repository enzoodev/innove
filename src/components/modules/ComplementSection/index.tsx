import { memo, useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  IconCamera,
  IconCameraOff,
  IconChevronDown,
  IconTrash,
} from 'tabler-react-native/icons';

import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import {
  DeleteComplementPhotoParams,
  SetComplementPhotoParams,
} from '@/hooks/api/useFormChecklist';

import { TSaveChecklistPhotoSchema } from '@/app/schemas/checklist/saveChecklistSchema';
import { photosQuantityPerSection } from '@/app/utils/constants/photosQuantityPerSection';
import { ListSeparators } from '@/app/utils/ListSeparators';

import { IconButton } from '@/components/elements/IconButton';
import { CollapsableContainer } from '@/components/elements/CollapsableContainer';

import * as S from './styles';

type Props = {
  photos: Array<TSaveChecklistPhotoSchema>;
  isOpen: boolean;
  onOpenSection: () => void;
  onSetPhoto: ({ photoUri, photoIndex }: SetComplementPhotoParams) => void;
  onDeletePhoto: ({ photoIndex }: DeleteComplementPhotoParams) => void;
};

export const ComplementSection = memo(
  ({ photos, isOpen, onOpenSection, onSetPhoto, onDeletePhoto }: Props) => {
    const theme = useTheme();
    const navigation = useAppNavigation();

    const handleTakePhoto = useCallback(
      (setPhoto: (uri: string, index: number) => void, index: number) => {
        navigation.navigate('TakeChecklistPhoto', {
          setPhoto,
          index,
        });
      },
      [navigation],
    );

    return (
      <S.Container>
        {isOpen ? (
          <CollapsableContainer isExpanded={isOpen}>
            <S.PhotosScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {photos.map((item, index, array) => (
                <S.ImageWrapper
                  key={(index + 1).toString()}
                  isLastItem={ListSeparators.getIsLastItem(index, array)}
                >
                  <S.Header isOpen>
                    <S.Title>
                      Fotos adicionais {index + 1}/
                      {photosQuantityPerSection.complement}
                    </S.Title>
                    {isOpen ? (
                      <S.ButtonsWrapper>
                        <IconButton
                          onPress={() =>
                            handleTakePhoto(
                              (photoUri, photoIndex) =>
                                onSetPhoto({ photoUri, photoIndex }),
                              index,
                            )
                          }
                          Icon={() => (
                            <IconCamera
                              stroke={1.5}
                              size={theme.iconSizes.sm}
                              color={theme.colors.textSecondary}
                            />
                          )}
                        />
                        <IconButton
                          disabled={!item.photoUri}
                          isDisabled={!item.photoUri}
                          onPress={() => onDeletePhoto({ photoIndex: index })}
                          Icon={() => (
                            <IconTrash
                              stroke={1.5}
                              size={theme.iconSizes.sm}
                              color={theme.colors.textSecondary}
                            />
                          )}
                        />
                      </S.ButtonsWrapper>
                    ) : (
                      <IconButton
                        onPress={onOpenSection}
                        Icon={() => (
                          <IconChevronDown
                            stroke={1.5}
                            size={theme.iconSizes.sm}
                            color={theme.colors.textSecondary}
                          />
                        )}
                      />
                    )}
                  </S.Header>
                  {item.photoUri ? (
                    <S.Image
                      resizeMode="cover"
                      resizeMethod="resize"
                      source={{
                        uri: item.photoUri,
                      }}
                    />
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        handleTakePhoto(
                          (photoUri, photoIndex) =>
                            onSetPhoto({ photoUri, photoIndex }),
                          index,
                        )
                      }
                    >
                      <S.ImageEmptyWrapper>
                        <IconCameraOff
                          stroke={1}
                          size={theme.layout[28]}
                          color={theme.colors.textTertiary}
                        />
                      </S.ImageEmptyWrapper>
                    </TouchableWithoutFeedback>
                  )}
                </S.ImageWrapper>
              ))}
            </S.PhotosScrollView>
          </CollapsableContainer>
        ) : (
          <TouchableWithoutFeedback onPress={onOpenSection} disabled={isOpen}>
            <S.Header isOpen={false}>
              <S.Title>Fotos adicionais</S.Title>
              <IconButton
                onPress={onOpenSection}
                Icon={() => (
                  <IconChevronDown
                    stroke={1.5}
                    size={theme.iconSizes.sm}
                    color={theme.colors.textSecondary}
                  />
                )}
              />
            </S.Header>
          </TouchableWithoutFeedback>
        )}
      </S.Container>
    );
  },
);
