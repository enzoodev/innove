interface IUrlBuilder {
  build(baseUrl: string, path: string, params?: unknown): string;
  group(...list: Array<unknown>): string;
}
