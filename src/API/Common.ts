const API_URL = "https://spa-api-psi.vercel.app/";

type FetchHeaders = {
  "Content-Type": string;
  Authorization?: string;
};

type FetchRequest = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: object;
  requiresAuth?: boolean;
  contentType?: string;
};

type FetchResponse<T> = {
  code: number;
  data: T | null;
  message: string;
};

const createFetchApi = () => {
  return async function FetchApi<T>({
    path,
    method,
    payload,
    requiresAuth,
    contentType,
    token,
  }: FetchRequest & { token?: string }): Promise<FetchResponse<T>> {
    const headers: FetchHeaders = {
      "Content-Type": contentType || "application/json",
    };

    let url = `${API_URL}${path}`;

    if (requiresAuth) {
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        const message = "Authentication required";
        return { code: 401, data: null, message };
      }
    }

    let body: string | FormData | undefined;
    if (method === "GET" && payload !== undefined) {
      let queryString: string;
      if (typeof payload === "object") {
        queryString = Object.entries(payload)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
      } else {
        queryString = payload as string;
      }
      url += `?${queryString}`;
    } else if (payload instanceof FormData) {
      body = payload;
    } else {
      body = JSON.stringify(payload);
    }

    const options: RequestInit = {
      method,
      headers,
      body,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message || "Error en la solicitud";

      return { code: response.status, data: null, message };
    }

    let rData: T | null = null;
    if (method !== "DELETE") {
      const result = await response.json();
      rData = result.data ?? null;
    }

    return { code: response.status, data: rData, message: "Success" };
  };
};

export const FetchApi = createFetchApi();
