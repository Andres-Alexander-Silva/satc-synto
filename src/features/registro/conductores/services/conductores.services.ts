import { satcApi } from "@/api/api";
import { ConductoresForm } from "@/features/registro/conductores/interfaces/conductores.interface";

export const getConductores = async () => {
  return await satcApi.get("/registro/conductor");
};

export const createConductores = async (data: ConductoresForm) => {
  return await satcApi.post("/registro/conductor", data);
};

export const findDocumetnoConductor = async (documento: string) => {
  return await satcApi.get(`/registro/conductor/find/${documento}`);
};

export const updateConductores = async (id: number, data: ConductoresForm) => {
  return await satcApi.put(`/registro/conductor/${id}/`, data);
};

export const deleteConductores = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/conductor/${id}/`, {
    data,
  });
};
