import { HttpMethod } from '@/enums/HttpMethod';
import { UrlBuilder } from '@/app/utils/UrlBuilder';
import { parseJsonToFormData } from '@/app/utils/parseJsonToFormData';
import { AuthStorageRepository } from '@/app/repositories/local/AuthStorageRepository';

type RegisterInterceptTokenManager = {
  logout: () => void;
} | null;

export class HttpServices {
  public static registerInterceptTokenManager: RegisterInterceptTokenManager =
    null;

  private static baseUrl = 'https://safety360.espertibrasil.com.br/api/';

  private static request = async <T>({
    url,
    method = HttpMethod.GET,
    data,
    params,
  }: TRequestConfig): Promise<T> => {
    const constructedUrl = UrlBuilder.build(this.baseUrl, url, params);
    const requestBody = parseJsonToFormData(data);
    const token = AuthStorageRepository.getToken();

    const response = await fetch(constructedUrl, {
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
        this.registerInterceptTokenManager.logout();
      }

      throw new Error();
    }

    const responseData: TApiResponse<T> = await response.json();
    return responseData.data;
  };

  public static get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.GET,
      ...params,
    });
  };

  public static post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.POST,
      ...params,
    });
  };

  public static put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.PUT,
      ...params,
    });
  };

  public static delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.DELETE,
      ...params,
    });
  };

  public static patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.PATCH,
      ...params,
    });
  };
}
