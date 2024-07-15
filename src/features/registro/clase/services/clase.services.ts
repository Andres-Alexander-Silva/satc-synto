import { satcApi } from "@/api/api";
import { ClaseForm } from "@/features/registro/clase/interface/clase.interface";

export const getClases = async () => {
  return await satcApi.get("/registro/clase");
};

export const createClases = async (data: ClaseForm) => {
  return await satcApi.post("/registro/clase", data);
};

export const updateClases = async (data: ClaseForm, id: number) => {
  return await satcApi.put(`/registro/clase/${id}/`, data);
};

export const deleteClases = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/clase/${id}`, {
    data,
  });
};
