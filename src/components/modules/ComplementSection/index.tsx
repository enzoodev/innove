import { memo } from 'react';
import { useTheme } from 'styled-components/native';
import {
  IconCamera,
  IconChevronDown,
  IconTrash,
} from 'tabler-react-native/icons';

import { TSaveChecklistPhotoSchema } from '@/app/schemas/checklist/saveChecklistSchema';
import { photosQuantityPerSection } from '@/app/utils/constants/photosQuantityPerSection';
import { ListSeparators } from '@/app/utils/ListSeparators';

import { IconButton } from '@/components/elements/IconButton';

import * as S from './styles';

type Props = {
  photos: Array<TSaveChecklistPhotoSchema>;
  isOpen: boolean;
  onOpenSection: () => void;
};

export const ComplementSection = memo(
  ({ photos, isOpen, onOpenSection }: Props) => {
    const theme = useTheme();

    return (
      <S.Container isOpen={isOpen}>
        {isOpen ? (
          <S.PhotosScrollView horizontal showsHorizontalScrollIndicator={false}>
            {photos.map((item, index, array) => (
              <S.ImageWrapper
                isLastItem={ListSeparators.getIsLastItem(index, array)}
              >
                <S.Header isOpen>
                  <S.Title isOpen>
                    Fotos complementares {index + 1}/
                    {photosQuantityPerSection.complement}
                  </S.Title>
                  {isOpen ? (
                    <S.ButtonsWrapper>
                      <IconButton
                        onPress={}
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
                        onPress={}
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
              </S.ImageWrapper>
            ))}
          </S.PhotosScrollView>
        ) : (
          <S.Header isOpen={false}>
            <S.Title isOpen={false}>Fotos complementares</S.Title>
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
        )}
      </S.Container>
    );
  },
);
