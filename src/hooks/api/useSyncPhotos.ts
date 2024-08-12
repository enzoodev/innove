import { useCallback, useMemo, useState } from 'react';
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
  const checklistPhotosStorageRepository = useMemo(
    () => new ChecklistPhotosStorageRepository(new StorageRepository()),
    [],
  );
  const syncPhotosRepository = useMemo(
    () =>
      new SyncPhotosRepository(
        new BaseRepository(httpServices, new UrlBuilder()),
        checklistPhotosStorageRepository,
      ),
    [checklistPhotosStorageRepository, httpServices],
  );

  const [hasPhotos, setHasPhotos] = useState(
    checklistPhotosStorageRepository.getHasPhotos(userId),
  );
  const [isLoadingSync, setIsLoadingSync] = useState(false);

  const syncPhotos = useCallback(async () => {
    try {
      setIsLoadingSync(true);
      await syncPhotosRepository.syncAll(userId);

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
      setIsLoadingSync(false);
    }
  }, [checklistPhotosStorageRepository, syncPhotosRepository, toast, userId]);

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
