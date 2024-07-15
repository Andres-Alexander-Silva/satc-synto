import { satcApi } from "@/api/api";
import { MenuForm } from "@/features/sistema/menus/interface/menu.interface";

export const getMenus = async () => {
  return await satcApi.get("/sistema/menu");
};

export const createMenus = async (data: MenuForm) => {
  return await satcApi.post("/sistema/menu", data);
};

export const updateMenus = async (id: number, data: MenuForm) => {
  return await satcApi.put(`/sistema/menu/${id}/`, data);
};

export const deleteMenus = async (id: number, estado: boolean) => {
  const data = { estado };
  return await satcApi.delete(`/sistema/menu/${id}/`, { data });
};
