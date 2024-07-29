import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { ChecklistPhotosStorageRepository } from '@/repositories/local/ChecklistPhotosStorageRepository';

import { Button } from '@/components/elements/Button';
import { AppModal } from '@/components/elements/AppModal';

import * as S from './styles';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  sync: () => Promise<void>;
};

export const SyncPhotosModal = ({
  isOpen,
  isLoading,
  onClose,
  sync,
}: Props) => {
  const [quantity, setQuantity] = useState(
    ChecklistPhotosStorageRepository.getPhotosByUser().length,
  );
  const theme = useTheme();

  const handleCloseModal = useCallback(() => {
    if (isLoading) {
      return;
    }

    onClose();
  }, [isLoading, onClose]);

  const handleSync = useCallback(async () => {
    try {
      await sync();
    } finally {
      onClose();
    }
  }, [onClose, sync]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setQuantity(ChecklistPhotosStorageRepository.getPhotosByUser().length);
  }, [isOpen]);

  return (
    <AppModal
      title="Deseja sincronizas as fotos?"
      isOpen={isOpen}
      onClose={handleCloseModal}
      fontSize={theme.fontSizes.md}
    >
      <S.Container>
        <S.Quantity>
          {quantity} foto{quantity === 1 ? '' : 's'} para sincronizar.
        </S.Quantity>
      </S.Container>
      <S.Footer>
        <Button title="Confirmar" onPress={handleSync} isLoading={isLoading} />
        <Button
          title="Voltar"
          onPress={handleCloseModal}
          bgColor={theme.colors.backgroundDark}
          color={theme.colors.textPrimary}
          itsCancelButton
        />
      </S.Footer>
    </AppModal>
  );
};
