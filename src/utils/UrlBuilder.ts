/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class UrlBuilder implements IUrlBuilder {
  public readonly build = (baseURL: string, url: string, params?: unknown) => {
    const fullUrl = new URL(url, baseURL);

    if (params) {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined),
      );

      const searchParams = new URLSearchParams(filteredParams);
      fullUrl.search = searchParams.toString();
    }

    return fullUrl.toString();
  };

  public group(...list: Array<unknown>) {
    return list.filter(item => !!item).join('/');
  }
}
