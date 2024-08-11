interface IBaseRepository {
  getAll<T = unknown>(params: TRequestConfig): Promise<Array<T>>;
  get<T = unknown>(params: TRequestConfig, id?: string): Promise<T>;
  create<T = unknown>(params: TRequestConfig): Promise<T>;
  update<T = unknown>(params: TRequestConfig, id?: string): Promise<T>;
  delete<T = unknown>(params?: TRequestConfig, id?: string): Promise<T>;
  patch<T = unknown>(id: string, params: TRequestConfig): Promise<T>;
}
