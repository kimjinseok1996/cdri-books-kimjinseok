import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { API_KEY, API_URL } from "../properties";

const createBaseConfig = () => ({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const createInterceptor = () => (config: InternalAxiosRequestConfig) => {
  if (API_KEY) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = "KakaoAK " + API_KEY;
  }
  return config;
};

const callsApi = axios.create(createBaseConfig());
callsApi.interceptors.request.use(createInterceptor());

export { callsApi };
