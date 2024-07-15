import { satcApi } from "@/api/api";
import { EmpresaForm } from "@/features/configuracion/empresas/interfaces/empresas.interface";

export const getEmpresas = async () => {
  return await satcApi.get("/registro/empresa");
};

export const createEmpresas = async (data: EmpresaForm) => {
  return await satcApi.post("/registro/empresa", data);
};

export const findEmpresa = async (id: number) => {
  return await satcApi.get(`/registro/empresa/find/${id}`);
};

export const updateEmpresas = async (id: number, data: EmpresaForm) => {
  return await satcApi.put(`/registro/empresa/${id}/`, data);
};

export const deleteEmpresas = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/empresa/${id}/`, { data });
};
