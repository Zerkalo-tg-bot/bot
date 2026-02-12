import type { AxiosResponse } from "axios";

export function requireData<T>(response: AxiosResponse<T>): T {
  if (response.data == null) {
    throw new Error("No data from API");
  }
  return response.data;
}
