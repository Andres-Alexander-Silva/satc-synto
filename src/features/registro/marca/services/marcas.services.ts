import { satcApi } from "@/api/api";
import { MarcasForm } from "@/features/registro/marca/interface/marcas.interfaces";

export const getMarcas = async () => {
  return await satcApi.get("/registro/marca");
};

export const createMarcas = async (data: MarcasForm) => {
  return await satcApi.post("/registro/marca", data);
};

export const updateMarcas = async (id: number, data: MarcasForm) => {
  return await satcApi.put(`/registro/marca/${id}/`, data);
};

export const deleteMarcas = async (id: number, estado: boolean) => {
  const data = { estado };
  return await satcApi.delete(`/registro/marca/${id}`, { data });
};
