import { HttpServices } from '@/services/HttpServices';
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

  public static async recoverAccount(
    params: TRecoverAccountParams,
  ): Promise<void> {
    await HttpServices.post({
      url: 'recover',
      data: params,
    });
  }

  public static async updatePassword(
    params: TUpdatePasswordParams,
  ): Promise<void> {
    await HttpServices.post({
      url: 'updatepass',
      data: params,
    });
  }
}
