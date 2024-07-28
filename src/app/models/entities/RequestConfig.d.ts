type TRequestConfig = {
  url: string;
  method?: HttpMethod;
  data?: Record<string, unknown> | FormData;
  params?: unknown;
};
