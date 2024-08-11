/* eslint-disable no-useless-constructor */
import { HttpMethod } from '@/enums/HttpMethod';

export class HttpServices implements IHttpServices {
  constructor(
    private readonly config: {
      urlBuilder: IUrlBuilder;
      requestFormatter: IRequestFormatter;
      tokenStorageRepository: ITokenStorageRepository;
      registerInterceptTokenManager: IRegisterInterceptTokenManager;
      baseUrl: string;
    },
  ) {}

  private request = async <T>({
    url,
    method = HttpMethod.GET,
    data,
    params,
  }: TRequestConfig): Promise<T> => {
    const constructedUrl = this.config.urlBuilder.build(
      this.config.baseUrl,
      url,
      params,
    );
    const requestBody = this.config.requestFormatter.format(data);
    const token = this.config.tokenStorageRepository.get();

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
      if (response.status === 401) {
        this.config.registerInterceptTokenManager.logout();
      }

      throw new Error();
    }

    const responseData: TApiResponse<T> = await response.json();
    return responseData.data;
  };

  public readonly get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.GET, ...params });
  };

  public readonly post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.POST, ...params });
  };

  public readonly put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PUT, ...params });
  };

  public readonly delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.DELETE, ...params });
  };

  public readonly patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PATCH, ...params });
  };
}
