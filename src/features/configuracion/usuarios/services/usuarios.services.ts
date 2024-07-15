import { satcApi } from "@/api/api";
import { UsuariosForm } from "@/features/configuracion/usuarios/interfaces/usuarios.interface";

export const getUsuarios = async () => {
  return await satcApi.get("/configuracion/user");
};

export const getGeneros = async () => {
  return await satcApi.get("/core/genero");
};

export const createUsuarios = async (data: UsuariosForm) => {
  return await satcApi.post("/configuracion/user", data);
};

export const updateUsuarios = async (id: number, data: UsuariosForm) => {
  return await satcApi.put(`/configuracion/user/${id}/`, data);
};

export const deleteUsuarios = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/configuracion/user/${id}`, { data });
};
