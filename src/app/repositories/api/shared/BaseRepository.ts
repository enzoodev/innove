import { HttpServices } from '@/app/services/HttpServices';
import { UrlBuilder } from '@/app/utils/UrlBuilder';

const appUrl = 'app';

export class BaseRepository {
  public static async getAll<T>(params: TRequestConfig): Promise<Array<T>> {
    return HttpServices.get<Array<T>>({
      ...params,
      url: UrlBuilder.group(appUrl, params.url),
    });
  }

  public static async get<T>(params: TRequestConfig, id?: string): Promise<T> {
    return HttpServices.get<T>({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    });
  }

  public static async create<T = unknown>(params: TRequestConfig): Promise<T> {
    return HttpServices.post({
      ...params,
      url: UrlBuilder.group(appUrl, params.url),
    });
  }

  public static async update<T = unknown>(
    id: string,
    params: TRequestConfig,
  ): Promise<T> {
    return HttpServices.put({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    });
  }

  public static async delete<T = unknown>(
    id: string,
    params: TRequestConfig,
  ): Promise<T> {
    return HttpServices.delete({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    });
  }

  public static async patch<T = unknown>(
    id: string,
    params: TRequestConfig,
  ): Promise<T> {
    return HttpServices.patch({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    });
  }
}
