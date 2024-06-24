import { HttpServices } from '@/app/services/HttpServices';
import { makeUrl } from '@/app/utils/makeUrl';

export class BaseRepository {
  appUrl = 'app';

  async getAll<T>(params: TRequestConfig): Promise<Array<T>> {
    return await HttpServices.get<Array<T>>({
      ...params,
      url: makeUrl(this.appUrl, params.url),
    });
  }

  async getById<T>(id: string, params: TRequestConfig): Promise<T> {
    return await HttpServices.get<T>({
      ...params,
      url: makeUrl(this.appUrl, params.url, id),
    });
  }

  async create(params: TRequestConfig): Promise<void> {
    await HttpServices.post({
      ...params,
      url: makeUrl(this.appUrl, params.url),
    });
  }

  async update(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.put({
      ...params,
      url: makeUrl(this.appUrl, params.url, id),
    });
  }

  async delete(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.delete({
      ...params,
      url: makeUrl(this.appUrl, params.url, id),
    });
  }

  async patch(id: string, params: TRequestConfig): Promise<void> {
    await HttpServices.patch({
      ...params,
      url: makeUrl(this.appUrl, params.url, id),
    });
  }
}
