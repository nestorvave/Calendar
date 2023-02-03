import axios, { AxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config: any) => {
  config.headers = {
      "x-token": localStorage.getItem("token"),
    ...config.headers,
  };
  return config;
});
