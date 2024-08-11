import { TokenStorageRepository } from '@/infrastructure/repositories/local/TokenStorageRepository';
import { StorageRepository } from '@/infrastructure/repositories/local/shared/StorageRepository';
import { HttpServices } from '@/infrastructure/services/HttpServices';

import { RequestFormatter } from '@/utils/RequestFormatter';
import { UrlBuilder } from '@/utils/UrlBuilder';

export function httpServicesFactory(
  registerInterceptTokenManager: IRegisterInterceptTokenManager,
): HttpServices {
  return new HttpServices({
    urlBuilder: new UrlBuilder(),
    requestFormatter: new RequestFormatter(),
    tokenStorageRepository: new TokenStorageRepository(new StorageRepository()),
    registerInterceptTokenManager,
    baseUrl: 'https://safety360.espertibrasil.com.br/api/',
  });
}
