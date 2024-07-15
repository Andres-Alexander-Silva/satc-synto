import { createContext, useState, useEffect } from "react";
import * as tipoDocumentoServices from "@/features/configuracion/tipo_documentos/services/tipoDocumento.services";
import { useForm } from "react-hook-form";
import {
  TipoDocumento,
  TipoDocumentoForm,
} from "@/features/configuracion/tipo_documentos/interfaces/tipo_documento.interface";
import Swal from "sweetalert2";

interface TipoDocumentoProviderProps {
  children: React.ReactNode;
}

interface TipoDocumentoContextValues {
  loading: boolean;
  currentTipoDocumento: TipoDocumento;
  tipoDocumento: TipoDocumento[];
  methodsTipoDocumento: any;
  handleClose: () => void;
  setCurrentTipoDocumento: (tipoDocumento: TipoDocumento) => void;
  createTipoDocumento: (data: TipoDocumentoForm) => void;
  updateTipoDocumento: (id: number, data: TipoDocumentoForm) => void;
  deleteTipoDocumento: (id: number, estado: boolean) => void;
}

export const TipoDocumentoContext = createContext<TipoDocumentoContextValues>({
  loading: false,
  currentTipoDocumento: {} as TipoDocumento,
  tipoDocumento: [],
  methodsTipoDocumento: {},
  handleClose: () => {},
  setCurrentTipoDocumento: (_tipoDocumento: TipoDocumento) => {},
  createTipoDocumento: (_data: TipoDocumentoForm) => {},
  updateTipoDocumento: (_id: number, _data: TipoDocumentoForm) => {},
  deleteTipoDocumento: (_id: number, _estado: boolean) => {},
});

export const TipoDocumentoProvider = ({
  children,
}: TipoDocumentoProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentTipoDocumento, setCurrentTipoDocumento] = useState(
    {} as TipoDocumento
  );
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento[]>([]);
  const methodsTipoDocumento = useForm<TipoDocumentoForm>();

  const handleClose = () => {
    setCurrentTipoDocumento({} as TipoDocumento);
    methodsTipoDocumento.reset();
  };

  const getTipoDocumento = async () => {
    try {
      setLoading(true);
      const { data } = await tipoDocumentoServices.getTipoDocumentos();
      setTipoDocumento(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTipoDocumento = async (data: TipoDocumentoForm) => {
    try {
      setLoading(true);
      await tipoDocumentoServices.createTipoDocumento(data);
      Swal.fire({
        icon: "success",
        title: "Tipo de documento creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getTipoDocumento();
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTipoDocumento = async (id: number, data: TipoDocumentoForm) => {
    try {
      setLoading(true);
      await tipoDocumentoServices.updateTipoDocumento(id, data);
      Swal.fire({
        icon: "success",
        title: "Tipo de documento actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getTipoDocumento();
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTipoDocumento = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await tipoDocumentoServices.deleteTipoDocumento(id, estado);
      Swal.fire({
        icon: "success",
        title: "Tipo de documento actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getTipoDocumento();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTipoDocumento();
  }, []);

  return (
    <TipoDocumentoContext.Provider
      value={{
        loading,
        currentTipoDocumento,
        tipoDocumento,
        methodsTipoDocumento,
        handleClose,
        setCurrentTipoDocumento,
        createTipoDocumento,
        updateTipoDocumento,
        deleteTipoDocumento,
      }}
    >
      {children}
    </TipoDocumentoContext.Provider>
  );
};
