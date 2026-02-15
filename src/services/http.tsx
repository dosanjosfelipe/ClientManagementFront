import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface QueueItem {
  resolve: (value?: void | PromiseLike<void>) => void;
  reject: (reason?: unknown) => void;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const PUBLIC_ROUTES = ["/login", "/register", "/auth/refresh"];

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      originalRequest.url?.includes(route),
    );

    if (isPublicRoute) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => http(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshClient.post("/auth/refresh");
        processQueue(null);
        return http(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default http;
