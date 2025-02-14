const request = async <T = unknown>(
  url: string | URL,
  params: RequestInit,
): Promise<T | null> => {
  try {
    const response = await fetch(url, params);
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export abstract class HttpService {
  baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  get<T = unknown>(path: `/${string}`): Promise<T | null> {
    const url = new URL(this.baseURL + path);

    return request<T>(url, {
      method: "GET",
    });
  }
}
