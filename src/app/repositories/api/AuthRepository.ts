import { HttpServices } from '@/app/services/HttpServices';
import { AuthStorageRepository } from '../local/AuthStorageRepository';

export class AuthRepository {
  public static async login(params: TLoginParams): Promise<TAuth> {
    const response = await HttpServices.post<TAuth>({
      url: 'login',
      data: params,
    });

    AuthStorageRepository.login(response);

    return response;
  }

  public static async logout(): Promise<void> {
    await HttpServices.get({
      url: 'logout',
    });

    AuthStorageRepository.logout();
  }
}
