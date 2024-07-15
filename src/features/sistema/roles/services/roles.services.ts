import { satcApi } from "@/api/api";
import {
  RolesForm,
  RolPermisoCheck,
} from "@/features/sistema/roles/interfaces/roles.interface";

export const getRoles = async () => {
  return await satcApi.get("/configuracion/role");
};

export const getRolPermiso = async (id: number) => {
  return await satcApi.get(`/sistema/rol_permiso/find/${id}/`);
};

export const assignPermisoRol = async (permisos: RolPermisoCheck) => {
  return await satcApi.put(`/sistema/rol_permiso`, permisos);
};

export const createRoles = async (data: RolesForm) => {
  return await satcApi.post("/configuracion/role", data);
};

export const updateRoles = async (id: number, data: RolesForm) => {
  return await satcApi.put(`/configuracion/role/${id}/`, data);
};

export const deleteRoles = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/configuracion/role/${id}/`, { data });
};
