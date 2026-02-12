import axios, { type AxiosInstance } from "axios";

let apiClient: AxiosInstance | null = null;

export function getApiClient(): AxiosInstance {
  const baseURL = process.env.API_URL;
  if (!baseURL) {
    throw new Error("API_URL env var is not set");
  }

  if (!apiClient || apiClient.defaults.baseURL !== baseURL) {
    apiClient = axios.create({ baseURL });
  }

  return apiClient;
}
