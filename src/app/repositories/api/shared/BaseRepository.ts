import { HttpServices } from '@/app/services/HttpServices';
import { UrlBuilder } from '@/app/utils/UrlBuilder';

export class BaseRepository {
  appUrl = 'app';

  async getAll<T>(params: TRequestConfig): Promise<Array<T>> {
    return HttpServices.get<Array<T>>({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url),
    });
  }

  async get<T>(params: TRequestConfig, id?: string): Promise<T> {
    return HttpServices.get<T>({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }

  async create<T = unknown>(params: TRequestConfig): Promise<T> {
    return HttpServices.post({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url),
    });
  }

  async update<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.put({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }

  async delete<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.delete({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }

  async patch<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.patch({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }
}
