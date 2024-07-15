import { satcApi } from "@/api/api";
import { VehiculosForm } from "@/features/registro/vehiculos/interfaces/vehiculos.interface";

export const getVehiculos = async () => {
  return await satcApi.get("/registro/vehiculo");
};

export const createVehiculos = async (data: VehiculosForm) => {
  return await satcApi.post("/registro/vehiculo", data);
};

export const findPlaca = async (placa: string) => {
  return await satcApi.get(`/registro/vehiculo/find/${placa}`);
};

export const updateVehiculos = async (id: number, data: VehiculosForm) => {
  return await satcApi.put(`/registro/vehiculo/${id}/`, data);
};

export const deleteVehiculos = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/vehiculo/${id}/`, {
    data,
  });
};
