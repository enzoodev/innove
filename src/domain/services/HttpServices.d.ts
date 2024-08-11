interface IHttpServices {
  get<T = unknown>(params: TRequestConfig): Promise<T>;
  post<T = unknown>(params: TRequestConfig): Promise<T>;
  put<T = unknown>(params: TRequestConfig): Promise<T>;
  delete<T = unknown>(params: TRequestConfig): Promise<T>;
  patch<T = unknown>(params: TRequestConfig): Promise<T>;
}
