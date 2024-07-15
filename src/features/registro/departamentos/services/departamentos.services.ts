import { satcApi } from "@/api/api";
import { DepartamentosForm } from "@/features/registro/departamentos/interfaces/departamentos.interfaces";

export const getDepartamentos = async () => {
  return await satcApi.get("/registro/departamento");
};

export const createDepartamento = async (data: DepartamentosForm) => {
  return await satcApi.post("/registro/departamento", data);
};

export const updateDepartamento = async (
  id: number,
  data: DepartamentosForm
) => {
  return await satcApi.put(`/registro/departamento/${id}/`, data);
};

export const deleteDepartamento = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/departamento/${id}`, { data });
};
