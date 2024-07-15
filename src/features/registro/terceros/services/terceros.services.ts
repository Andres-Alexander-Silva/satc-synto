import { satcApi } from "@/api/api";
import { TercerosForm } from "@/features/registro/terceros/interface/terceros.interface";

export const getTerceros = async () => {
  return await satcApi.get("/registro/tercero");
};

export const createTerceros = async (data: TercerosForm) => {
  return await satcApi.post("/registro/tercero", data);
};

export const findDocumetoTercero = async (documento: string) => {
  return await satcApi.get(`/registro/tercero/find/${documento}`);
};

export const updateTerceros = async (id: number, data: TercerosForm) => {
  return await satcApi.put(`/registro/tercero/${id}/`, data);
};

export const deleteTerceros = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/tercero/${id}/`, { data });
};
