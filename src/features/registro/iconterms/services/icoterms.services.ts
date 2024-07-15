import { satcApi } from "@/api/api";
import { IcotermsForm } from "@/features/registro/iconterms/interfaces/icoterms.interface";

export const getIcoterms = async () => {
  return await satcApi.get("/registro/termino");
};

export const createIcoterms = async (data: IcotermsForm) => {
  return await satcApi.post("/registro/termino", data);
};

export const updateIcoTerms = async (id: number, data: IcotermsForm) => {
  return await satcApi.put(`/registro/termino/${id}/`, data);
};

export const deleteIcoTerms = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/termino/${id}`, {
    data,
  });
};
