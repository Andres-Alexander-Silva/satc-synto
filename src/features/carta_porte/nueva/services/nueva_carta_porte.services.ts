import { satcApi } from "@/api/api";
import { NuevaCartaPorteForm } from "@/features/carta_porte/nueva/interfaces/nueva_carta_porte.interface";

export const getListadoCartaPorte = async () => {
  return await satcApi.get("/cartaporte/listado");
};

export const createCartaPorte = async (data: NuevaCartaPorteForm) => {
  return await satcApi.post("/cartaporte/nuevo", data);
};

export const findCartaporte = async (id: string) => {
  return await satcApi.get(`/cartaporte/find/${id}`);
};

export const editCartaporte = async (id: number, data: NuevaCartaPorteForm) => {
  return await satcApi.put(`/cartaporte/editar/${id}/`, data);
};
