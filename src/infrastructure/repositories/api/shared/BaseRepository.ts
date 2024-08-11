/* eslint-disable no-useless-constructor */
const appUrl = 'app';

export class BaseRepository implements IBaseRepository {
  constructor(
    private readonly httpServices: IHttpServices,
    private readonly urlBuilder: IUrlBuilder,
  ) {}

  public async getAll<T = unknown>(params: TRequestConfig): Promise<Array<T>> {
    return this.httpServices.get({
      ...params,
      url: this.urlBuilder.group(appUrl, params.url),
    });
  }

  public async get<T = unknown>(
    params: TRequestConfig,
    id?: string,
  ): Promise<T> {
    return this.httpServices.get({
      ...params,
      url: this.urlBuilder.group(appUrl, params.url, id),
    });
  }

  public async create<T = unknown>(params: TRequestConfig): Promise<T> {
    return this.httpServices.post({
      ...params,
      url: this.urlBuilder.group(appUrl, params.url),
    });
  }

  public async update<T = unknown>(
    params: TRequestConfig,
    id?: string,
  ): Promise<T> {
    return this.httpServices.put({
      ...params,
      url: this.urlBuilder.group(appUrl, params.url, id),
    });
  }

  public async delete<T = unknown>(
    params?: TRequestConfig,
    id?: string,
  ): Promise<T> {
    return this.httpServices.delete({
      ...params,
      url: this.urlBuilder.group(appUrl, params?.url, id),
    });
  }

  public async patch<T = unknown>(
    id: string,
    params: TRequestConfig,
  ): Promise<T> {
    return this.httpServices.patch({
      ...params,
      url: this.urlBuilder.group(appUrl, params.url, id),
    });
  }
}
