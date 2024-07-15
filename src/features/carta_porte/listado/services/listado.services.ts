import { satcApi } from "@/api/api";

export const getListadoCartaPorte = async () => {
  return await satcApi.get("/cartaporte/listado");
};

export const downloadOriginal = async (
  id: number,
  copias: number,
  is_original: boolean
) => {
  const formatData = {
    cartaporte: id,
    num_copias: copias,
    is_original: is_original,
  };
  return await satcApi.post("/cartaporte/pdf", formatData);
};

export const updateDetalle = async (data: any) => {
  return await satcApi.put(`/cartaporte/detalle/editar`, data);
};
