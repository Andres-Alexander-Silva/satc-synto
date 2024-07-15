import { satcApi } from "@/api/api";
import { PuntoSalidaForm } from "@/features/registro/punto_salida/interfaces/puntos_salida.interface";

export const getPuntosSalida = async () => {
  return await satcApi.get("registro/puntosalida");
};

export const createPuntosSalida = async (data: PuntoSalidaForm) => {
  return await satcApi.post("registro/puntosalida", data);
};

export const updatePuntosSalida = async (id: number, data: PuntoSalidaForm) => {
  return await satcApi.put(`registro/puntosalida/${id}/`, data);
};

export const deletePuntosSalida = async (id: number, estado: boolean) => {
  const data = { estado: estado };

  return await satcApi.delete(`registro/puntosalida/${id}`, { data });
};
