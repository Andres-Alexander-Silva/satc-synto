import { satcApi } from "@/api/api";
import { MunicipiosForm } from "@/features/registro/municipios/interface/municipios.interface";

export const getMunicipios = async () => {
  return await satcApi.get("/registro/municipio");
};

export const createMunicipios = async (data: MunicipiosForm) => {
  return await satcApi.post("/registro/municipio", data);
};

export const updateMunicipios = async (id: number, data: MunicipiosForm) => {
  return await satcApi.put(`/registro/municipio/${id}/`, data);
};

export const deleteMunicipios = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/municipio/${id}/`, { data });
};
