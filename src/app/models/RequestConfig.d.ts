type TRequestConfig<T = unknown> = {
  url: string;
  method?: HttpMethod;
  data?: T;
  params?: unknown;
};
