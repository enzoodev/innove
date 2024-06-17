export interface RequestConfig<D = unknown> {
  method?: HttpMethod;
  data?: D;
  headers?: HeadersInit;
  params?: unknown;
  withCredentials?: boolean;
  signal?: AbortSignal;
  token?: string;
}

export interface FetchRequestConfig extends RequestConfig {
  url?: string;
}

export interface BaseRequestConfig extends RequestConfig {
  url: string;
}
