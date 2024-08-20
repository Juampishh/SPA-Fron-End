const API_URL = "http://localhost:3005/";

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
  }: FetchRequest & { token?: string }): Promise<FetchResponse<any>> {
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

    let body;
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
        queryString = payload;
      }
      url += `?${queryString}`;
    } else if (payload instanceof FormData) {
      body = payload;
    } else {
      body = JSON.stringify(payload);
    }

    const options = {
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

    let rData: FetchResponse<any> | null = null;
    if (method !== "DELETE") {
      rData = await response.json();
    }
    if (Object.keys(rData ?? {}).includes("data")) {
      rData = rData?.data;
    }
    return { code: response.status, data: rData, message: "Success" };
  };
};

export const FetchApi = createFetchApi();
