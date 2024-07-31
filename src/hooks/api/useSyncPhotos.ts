import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import { useAuth } from '@/hooks/api/useAuth';

import { SyncPhotosRepository } from '@/repositories/api/SyncPhotosRepository';
import { ChecklistPhotosStorageRepository } from '@/repositories/local/ChecklistPhotosStorageRepository';

export const useSyncPhotos = () => {
  const toast = useToast();
  const { userId } = useAuth();

  const [hasPhotos, setHasPhotos] = useState(
    ChecklistPhotosStorageRepository.getHasPhotos(userId),
  );

  const { mutateAsync: syncFn, isPending: isLoadingSync } = useMutation({
    mutationFn: SyncPhotosRepository.syncAll,
  });

  const syncPhotos = useCallback(async () => {
    try {
      await syncFn(userId);

      toast.show('Fotos sincronizadas com sucesso!', {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      toast.show('Erro ao sincronizar fotos.', {
        type: 'error',
        placement: 'top',
      });
    } finally {
      setHasPhotos(ChecklistPhotosStorageRepository.getHasPhotos(userId));
    }
  }, [syncFn, toast, userId]);

  useFocusEffect(
    useCallback(() => {
      setHasPhotos(ChecklistPhotosStorageRepository.getHasPhotos(userId));
    }, [userId]),
  );

  return {
    hasPhotos,
    syncPhotos,
    isLoadingSync,
  };
};
