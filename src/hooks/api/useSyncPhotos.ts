import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import { ChecklistPhotosStorageRepository } from '@/infrastructure/repositories/local/ChecklistPhotosStorageRepository';
import { StorageRepository } from '@/infrastructure/repositories/local/shared/StorageRepository';
import { SyncPhotosRepository } from '@/infrastructure/repositories/api/SyncPhotosRepository';
import { BaseRepository } from '@/infrastructure/repositories/api/shared/BaseRepository';
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory';

import { useAuth } from '@/hooks/api/useAuth';

import { UrlBuilder } from '@/utils/UrlBuilder';

export const useSyncPhotos = () => {
  const toast = useToast();
  const { userId, handleCleanAuth } = useAuth();

  const httpServices = httpServicesFactory({ logout: handleCleanAuth });
  const baseRepository = new BaseRepository(httpServices, new UrlBuilder());
  const checklistPhotosStorageRepository = useMemo(
    () => new ChecklistPhotosStorageRepository(new StorageRepository()),
    [],
  );
  const syncPhotosRepository = new SyncPhotosRepository(
    baseRepository,
    checklistPhotosStorageRepository,
  );

  const [hasPhotos, setHasPhotos] = useState(
    checklistPhotosStorageRepository.getHasPhotos(userId),
  );

  const { mutateAsync: syncFn, isPending: isLoadingSync } = useMutation({
    mutationFn: syncPhotosRepository.syncAll,
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
      setHasPhotos(checklistPhotosStorageRepository.getHasPhotos(userId));
    }
  }, [checklistPhotosStorageRepository, syncFn, toast, userId]);

  useFocusEffect(
    useCallback(() => {
      setHasPhotos(checklistPhotosStorageRepository.getHasPhotos(userId));
    }, [checklistPhotosStorageRepository, userId]),
  );

  return {
    hasPhotos,
    syncPhotos,
    isLoadingSync,
  };
};
