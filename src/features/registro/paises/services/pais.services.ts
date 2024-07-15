import { satcApi } from "@/api/api";
import { PaisForm } from "@/features/registro/paises/interfaces/pais.interface";

export const getPaises = async () => {
  return await satcApi.get("/registro/pais");
};

export const createPais = async (data: PaisForm) => {
  return await satcApi.post("/registro/pais", data);
};

export const updatePais = async (id: number, data: PaisForm) => {
  return await satcApi.put(`/registro/pais/${id}/`, data);
};

export const deletePais = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/pais/${id}`, { data });
};
