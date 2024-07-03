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

  async create(params: TRequestConfig): Promise<void> {
    await HttpServices.post({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url),
    });
  }

  async update(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.put({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }

  async delete(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.delete({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }

  async patch(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.patch({
      ...params,
      url: UrlBuilder.group(this.appUrl, params.url, id),
    });
  }
}
