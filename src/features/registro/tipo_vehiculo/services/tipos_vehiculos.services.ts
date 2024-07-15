import { satcApi } from "@/api/api";
import { TiposVehiculosForm } from "@/features/registro/tipo_vehiculo/interface/tipos_vehiculos.interface";

export const getTiposVehiculos = async () => {
  return await satcApi.get("/registro/tipo_vehiculo");
};

export const createTipoVeiculo = async (tipoVehiculo: TiposVehiculosForm) => {
  return await satcApi.post("/registro/tipo_vehiculo", tipoVehiculo);
};

export const updateTipoVeiculo = async (
  id: number,
  tipoVehiculo: TiposVehiculosForm
) => {
  return await satcApi.put(`/registro/tipo_vehiculo/${id}/`, tipoVehiculo);
};

export const deleteTipoVeiculo = async (id: number, estado: boolean) => {
  const data = { estado: estado };
  return await satcApi.delete(`/registro/tipo_vehiculo/${id}/`, { data });
};
