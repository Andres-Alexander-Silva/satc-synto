import { satcApi } from "@/api/api";
import { AuthForm } from "@/features/auth/interfaces/auth.interface";

export const login = async (data: AuthForm) => {
  return await satcApi.post("auth/login", data);
};

export const logout = async (token: string) => {
  return await satcApi.post("auth/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
