import axios from "axios";

export const satcApi = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
});