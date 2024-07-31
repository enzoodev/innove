import { HttpServices } from '@/services/HttpServices';
import { TokenStorageRepository } from '../local/TokenStorageRepository';

export class AuthRepository {
  public static async getUser(): Promise<TAuth> {
    return HttpServices.get({
      url: 'user',
    });
  }

  public static async login(params: TLoginParams): Promise<TAuth> {
    const response = await HttpServices.post<TAuth>({
      url: 'login',
      data: params,
    });

    TokenStorageRepository.save(response.token);

    return response;
  }

  public static async logout(): Promise<void> {
    await HttpServices.get({
      url: 'logout',
    });

    TokenStorageRepository.delete();
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
