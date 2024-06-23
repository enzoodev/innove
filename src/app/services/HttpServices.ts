import { HttpMethod } from '@/enums/HttpMethod';
import { buildUrl } from '@/app/utils/buildUrl';
import { parseJsonToFormData } from '@/app/utils/parseJsonToFormData';
import { AuthStorageRepository } from '@/app/repositories/local/AuthStorageRepository';

type RegisterInterceptTokenManager = {
  logout: () => Promise<void>;
} | null;

export class HttpServices {
  public static registerInterceptTokenManager: RegisterInterceptTokenManager =
    null;

  public static baseUrl = 'https://safety360.espertibrasil.com.br/api/';

  public static request = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    const method = params.method ?? HttpMethod.GET;
    const url = buildUrl(this.baseUrl, params.url, params.params);
    const requestBody = parseJsonToFormData(params.data);
    const token = AuthStorageRepository.getToken();

    const response = await fetch(url, {
      method,
      body: requestBody,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token ?? 'no-token'}`,
        'Content-Type':
          method === HttpMethod.POST
            ? 'multipart/form-data'
            : 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401 && this.registerInterceptTokenManager) {
        // show toast error
        await this.registerInterceptTokenManager.logout();
      }

      throw new Error();
    }

    const responseData: TApiResponse<T> = await response.json();
    return responseData.data;
  };

  public static get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return await this.request<T>({
      method: HttpMethod.GET,
      ...params,
    });
  };

  public static post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return await this.request<T>({
      method: HttpMethod.POST,
      ...params,
    });
  };

  public static put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return await this.request<T>({
      method: HttpMethod.PUT,
      ...params,
    });
  };

  public static delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return await this.request<T>({
      method: HttpMethod.DELETE,
      ...params,
    });
  };

  public static patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return await this.request<T>({
      method: HttpMethod.PATCH,
      ...params,
    });
  };
}
