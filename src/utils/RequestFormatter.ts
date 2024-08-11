export class RequestFormatter implements IRequestFormatter {
  public format = (data?: Record<string, unknown> | FormData) => {
    if (!data) {
      return null;
    }

    if (data instanceof FormData) {
      return data;
    }

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return formData;
  };
}
