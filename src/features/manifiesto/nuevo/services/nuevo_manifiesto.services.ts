import { satcApi } from "@/api/api";
import { NuevoManifiesto } from "@/features/manifiesto/nuevo/interface/nuevo_manifiesto.interface";

export const getManifiestos = async () => {
  return await satcApi.get("manifiesto/listado");
};

export const createManifiesto = async (data: NuevoManifiesto) => {
  return await satcApi.post("/manifiesto/nuevo", data);
};

export const updateManifiesto = async (id: number, data: NuevoManifiesto) => {
  return await satcApi.put(`/manifiesto/editar/${id}/`, data);
};

export const findManifiesto = async (id: number) => {
  return await satcApi.get(`/manifiesto/find/${id}`);
};

export const manifiestoSelect = async (cartaporte: number, detId: number) => {
  return await satcApi.get(`manifiesto/select/${cartaporte}/${detId}`);
};

export const findCartaporte = async (id: number) => {
  return await satcApi.get(`cartaporte/find/${id}`);
};
