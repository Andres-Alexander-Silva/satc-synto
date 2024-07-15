import { satcApi } from "@/api/api";

export const getManifiestos = async () => {
  return await satcApi.get("manifiesto/listado");
};

export const manifiestoPdf = async (
  id: number,
  termino: string,
  numCopias: number,
  sumPesB: any,
  is_original: boolean
) => {
  const formatData = {
    manifiesto: id,
    ter_mun_mon: termino,
    num_copias: numCopias,
    sumPesB: sumPesB.sumaPesosBrutos,
    sumPesN: sumPesB.sumaPesosNetos,
    is_original: is_original,
  };

  return await satcApi.post("manifiesto/pdf", formatData);
};
