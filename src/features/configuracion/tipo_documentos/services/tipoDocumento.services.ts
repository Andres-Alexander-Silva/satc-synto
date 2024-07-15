import { satcApi } from "@/api/api";
import { TipoDocumentoForm } from "@/features/configuracion/tipo_documentos/interfaces/tipo_documento.interface";

export const getTipoDocumentos = async () => {
  return await satcApi.get("/configuracion/tipo_documento");
};

export const createTipoDocumento = async (tipoDocumento: TipoDocumentoForm) => {
  return await satcApi.post("/configuracion/tipo_documento", tipoDocumento);
};

export const updateTipoDocumento = async (
  id: number,
  tipoDocumento: TipoDocumentoForm
) => {
  return await satcApi.put(
    `/configuracion/tipo_documento/${id}/`,
    tipoDocumento
  );
};

export const deleteTipoDocumento = async (id: number, estado: boolean) => {
  const data = { estado };
  return await satcApi.delete(`/configuracion/tipo_documento/${id}`, { data });
};
