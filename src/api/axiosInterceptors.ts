import { satcApi } from "@/api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const addAuthorizationHeader = (config: any) => {
  const token = cookies.get("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const handleUnauthorizedError = (error: any) => {
  if (error.response && error.response.status === 401) {
    redirectToLogin();
    clearAuthToken();
  }
  return Promise.reject(error);
};

satcApi.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
satcApi.interceptors.response.use(
  (response) => response,
  handleUnauthorizedError
);

function redirectToLogin() {
  window.location.href = "/";
}

function clearAuthToken() {
  cookies.remove("token");
}
