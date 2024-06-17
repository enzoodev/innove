export class HttpServices {
  public baseUrl = '';

  public static api = () => {
    const instance = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_URL ?? 'https://api-dev.smartmk.com.br/',
      withCredentials: true,
    });

    instance.defaults.withCredentials = true;

      instance.interceptors.response.use(
        response => response,
        error => {
          if (error.response?.status === 401) {
            console.error('Você não está logada no Rosinha :)');
            Cookies.remove('@SMARTMK:token');
            window.location.href = '/auth/signin';

            return new Promise(() => {});
          }

          return Promise.reject(error);
        },
      );

    instance.interceptors.request.use(config => {
      const token = Cookies.get('@SMARTMK:token');

      if (token && token !== '' && config.headers) {
        const tokenDecrypted = CryptoJS.AES.decrypt(
          token,
          process.env.NEXT_PUBLIC_SECRET_ENCRYPT as string,
        ).toString(CryptoJS.enc.Utf8);

        config.headers.Authorization = `Bearer ${tokenDecrypted}`;
      }

      config.headers['X-Requested-With'] = `XMLHttpRequest`;

      return config;
    });

    return instance;
  };

  public static get = async <T>(url: string, data?: any): Promise<T> => {
    return await this.request(url);
  };

  public static post = async (url: string, data: any) => {
    const api = this.api();

    return await api.post(url, data);
  };

  public static put = async (url: string, data: any) => {
    const api = this.api();

    return await api.put(url, data);
  };

  public static delete = async (url: string, data?: any) => {
    const api = this.api();

    if (data) {
      return await api.delete(url, data);
    }
    return await api.delete(url);
  };

  public static patch = async (url: string, data?: any) => {
    const api = this.api();

    if (data) {
      return await api.patch(url, data);
    }
    return await api.patch(url);
  };
}
