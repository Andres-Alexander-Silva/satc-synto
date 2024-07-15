import { satcApi } from "@/api/api";
import { OpcionesForm } from "@/features/sistema/opciones/interface/opciones.interfaces";

export const getOpciones = async () => {
  return await satcApi.get("/sistema/opcion");
};

export const createOpciones = async (data: OpcionesForm) => {
  return await satcApi.post("/sistema/opcion", data);
};

export const updateOpciones = async (id: number, data: OpcionesForm) => {
  return await satcApi.put(`/sistema/opcion/${id}/`, data);
};

export const deleteOpciones = async (id: number, estado: boolean) => {
  const data = { estado };
  return await satcApi.delete(`/sistema/opcion/${id}/`, { data });
};
