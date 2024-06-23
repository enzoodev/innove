export const buildUrl = (
    baseURL: string,
    url: string,
    params?: unknown,
  ) => {
    const fullUrl = new URL(url, baseURL);

    if (params) {
      const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined)
      );

      const searchParams = new URLSearchParams(filteredParams);
      fullUrl.search = searchParams.toString();
    }

    return fullUrl.toString();
}
