import { satcApi } from "@/api/api";

export const getPermissions = async () => {
  return await satcApi.get("/auth/permission");
};
