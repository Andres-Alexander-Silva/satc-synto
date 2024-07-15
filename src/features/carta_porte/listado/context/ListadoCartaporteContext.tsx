import { createContext, useEffect, useState } from "react";
import * as listadoCartaporteServices from "@/features/carta_porte/listado/services/listado.services";
import { CartaporteListado } from "@/features/carta_porte/listado/interface/listado.interface";

interface ListadoCartaporteProviderProps {
  children: React.ReactNode;
}

interface ListadoCartaporteContextValues {
  loading: boolean;
  listadoCartaporte: CartaporteListado[];
  downloadOriginal: (id: number, copias: number, is_original: boolean) => void;
}

export const ListadoCartaporteContext =
  createContext<ListadoCartaporteContextValues>({
    loading: false,
    listadoCartaporte: [],
    downloadOriginal: (
      _id: number,
      _copias: number,
      _is_original: boolean
    ) => {},
  });

export const ListadoCartaporteProvider = ({
  children,
}: ListadoCartaporteProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [listadoCartaporte, setListadoCartaporte] = useState<
    CartaporteListado[]
  >([]);

  const getListado = async () => {
    try {
      setLoading(true);
      const { data } = await listadoCartaporteServices.getListadoCartaPorte();
      setListadoCartaporte(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadOriginal = async (
    id: number,
    copias: number,
    is_original: boolean
  ) => {
    try {
      const { data } = await listadoCartaporteServices.downloadOriginal(
        id,
        copias,
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
        a.download = `cp_${id}.pdf`;
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
    <ListadoCartaporteContext.Provider
      value={{
        downloadOriginal,
        loading,
        listadoCartaporte,
      }}
    >
      {children}
    </ListadoCartaporteContext.Provider>
  );
};
