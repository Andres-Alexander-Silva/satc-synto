import { createContext, useEffect, useState } from "react";
import * as listadoManifiestoServices from "@/features/manifiesto/listado/services/listado_manifiesto.services";
import { Manifiestos } from "@/features/manifiesto/listado/interfaces/listado_manifiesto.interfaces";

interface ListadoManifiestoProviderProps {
  children: React.ReactNode;
}

interface ListadoManifiestoContextValues {
  loading: boolean;
  manifiestos: Manifiestos[];
  downloadOriginal: (
    id: number,
    termino: string,
    numCopias: number,
    sumPesB: any,
    is_original: boolean
  ) => void;
}

export const ListadoManifiestoContext =
  createContext<ListadoManifiestoContextValues>({
    loading: false,
    manifiestos: [],
    downloadOriginal: (
      _id: number,
      _termino: string,
      _numCopias: number,
      _sumPesB: any,
      _is_original: boolean
    ) => {},
  });

export const ListadoManifiestoProvider = ({
  children,
}: ListadoManifiestoProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [manifiestos, setManifiestos] = useState<Manifiestos[]>([]);

  const getListado = async () => {
    try {
      setLoading(true);
      const { data } = await listadoManifiestoServices.getManifiestos();
      setManifiestos(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadOriginal = async (
    id: number,
    termino: string,
    numCopias: number,
    sumPesB: any,
    is_original: boolean
  ) => {
    try {
      const { data } = await listadoManifiestoServices.manifiestoPdf(
        id,
        termino,
        numCopias,
        sumPesB,
        is_original
      );
      if (data && data.pdf) {
        const base64Data = data.pdf;
        const contentType = "application/pdf";

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `manifiesto_${id}.pdf`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListado();
  }, []);

  return (
    <ListadoManifiestoContext.Provider
      value={{
        downloadOriginal,
        loading,
        manifiestos,
      }}
    >
      {children}
    </ListadoManifiestoContext.Provider>
  );
};
