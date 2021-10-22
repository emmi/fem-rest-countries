import axios, { AxiosRequestConfig } from 'axios';

const API_ROOT = 'https://restcountries.com/v2';

export async function get<TResponse = any>(
  url: string,
  params: AxiosRequestConfig['params'] = {}
): Promise<TResponse | undefined> {
  try {
    const response: any = await axios.get(`${API_ROOT}${url}`, {
      params: { ...params }
    });

    if (!!response.data.status && response.data.status === 404) {
      return;
    }

    return response.data as TResponse;
  } catch (err) {
    console.error(`Error with the API request -> ${err}`);
  }
}
