import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/api/useAuth';

import { ChecklistPhotosStorageRepository } from '@/infrastructure/repositories/local/ChecklistPhotosStorageRepository';
import { StorageRepository } from '@/infrastructure/repositories/local/shared/StorageRepository';

import { Button } from '@/components/elements/Button';
import { AppModal } from '@/components/elements/AppModal';

import * as S from './styles';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  sync: () => Promise<void>;
};

const checklistPhotosStorageRepository = new ChecklistPhotosStorageRepository(
  new StorageRepository(),
);

export const SyncPhotosModal = ({
  isOpen,
  isLoading,
  onClose,
  sync,
}: Props) => {
  const { userId } = useAuth();
  const [quantity, setQuantity] = useState(
    checklistPhotosStorageRepository.getPhotosByUser(userId).length,
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

    setQuantity(
      checklistPhotosStorageRepository.getPhotosByUser(userId).length,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
