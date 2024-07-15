import { createContext, useState, useEffect } from "react";
import * as tercerosServices from "@/features/registro/terceros/services/terceros.services";
import { useForm } from "react-hook-form";
import {
  TercerosForm,
  Terceros,
} from "@/features/registro/terceros/interface/terceros.interface";
import Swal from "sweetalert2";

interface TercerosProviderProps {
  children: React.ReactNode;
}

interface TercerosContextValues {
  loading: boolean;
  currentTerceros: Terceros;
  terceros: Terceros[];
  methodsTerceros: any;
  handleClose: () => void;
  setCurrentTerceros: (terceros: Terceros) => void;
  createTerceros: (data: TercerosForm) => void;
  updateTerceros: (id: number, data: TercerosForm) => void;
  deleteTerceros: (id: number, estado: boolean) => void;
  findDocumentoTercero: (documento: string) => void;
}

export const TercerosContext = createContext<TercerosContextValues>({
  loading: false,
  currentTerceros: {} as Terceros,
  terceros: [],
  methodsTerceros: {},
  handleClose: () => {},
  setCurrentTerceros: (_terceros: Terceros) => {},
  createTerceros: (_data: TercerosForm) => {},
  updateTerceros: (_id: number, _data: TercerosForm) => {},
  deleteTerceros: (_id: number, _estado: boolean) => {},
  findDocumentoTercero: (_documento: string) => {},
});

export const TercerosProvider = ({ children }: TercerosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentTerceros, setCurrentTerceros] = useState({} as Terceros);
  const [terceros, setTerceros] = useState<Terceros[]>([]);
  const methodsTerceros = useForm<TercerosForm>();

  const handleClose = () => {
    setCurrentTerceros({} as Terceros);
    methodsTerceros.reset();
  };

  const getTerceros = async () => {
    try {
      setLoading(true);
      const { data } = await tercerosServices.getTerceros();
      setTerceros(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTerceros = async (data: TercerosForm) => {
    try {
      setLoading(true);
      await tercerosServices.createTerceros(data);
      Swal.fire({
        icon: "success",
        title: "Tercero creado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getTerceros();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findDocumentoTercero = async (documento: string) => {
    try {
      const { data } = await tercerosServices.findDocumetoTercero(documento);
      if (data.response === true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El documento ya se encuentra registrado",
          customClass: {
            container: "swal2-container",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTerceros = async (id: number, data: TercerosForm) => {
    try {
      setLoading(true);
      await tercerosServices.updateTerceros(id, data);
      Swal.fire({
        icon: "success",
        title: "Tercero actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getTerceros();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTerceros = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await tercerosServices.deleteTerceros(id, estado);
      Swal.fire({
        icon: "success",
        title: "Tercero actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getTerceros();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    getTerceros();
  }, []);
  return (
    <TercerosContext.Provider
      value={{
        findDocumentoTercero,
        loading,
        currentTerceros,
        terceros,
        methodsTerceros,
        handleClose,
        setCurrentTerceros,
        createTerceros,
        updateTerceros,
        deleteTerceros,
      }}
    >
      {children}
    </TercerosContext.Provider>
  );
};
