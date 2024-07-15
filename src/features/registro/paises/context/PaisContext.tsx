import { createContext, useState, useEffect } from "react";
import * as paisServices from "@/features/registro/paises/services/pais.services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  PaisForm,
  Pais,
} from "@/features/registro/paises/interfaces/pais.interface";
import Swal from "sweetalert2";

interface PaisProviderProps {
  children: React.ReactNode;
}

interface PaisContextValues {
  loading: boolean;
  currentPais: Pais;
  paises: Pais[];
  methodsPais: any;
  handleClose: () => void;
  setCurrentPais: (pais: Pais) => void;
  createPaises: (data: PaisForm) => void;
  updatePais: (id: number, data: PaisForm) => void;
  deletePais: (id: number, estado: boolean) => void;
}

export const PaisContext = createContext<PaisContextValues>({
  loading: false,
  currentPais: {} as Pais,
  paises: [],
  methodsPais: {},
  handleClose: () => {},
  setCurrentPais: (_pais: Pais) => {},
  createPaises: (_data: PaisForm) => {},
  updatePais: (_id: number, _data: PaisForm) => {},
  deletePais: (_id: number, _estado: boolean) => {},
});

export const PaisProvider = ({ children }: PaisProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentPais, setCurrentPais] = useState({} as Pais);
  const [paises, setPaises] = useState<Pais[]>([]);
  const methodsPais = useForm<PaisForm>();

  const handleClose = () => {
    setCurrentPais({} as Pais);
    methodsPais.reset();
  };

  const getPaises = async () => {
    try {
      setLoading(true);
      const { data } = await paisServices.getPaises();
      setPaises(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPaises = async (data: PaisForm) => {
    try {
      setLoading(true);
      await paisServices.createPais(data);
      getPaises();
      Swal.fire({
        icon: "success",
        title: "Pais creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      methodsPais.reset();
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

  const updatePais = async (id: number, data: PaisForm) => {
    try {
      setLoading(true);
      await paisServices.updatePais(id, data);
      getPaises();
      Swal.fire({
        icon: "success",
        title: "Pais actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
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

  const deletePais = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await paisServices.deletePais(id, estado);
      getPaises();
      Swal.fire({
        icon: "success",
        title: "Se cambio el estado del pais con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error) {
      toast.error("Error al actualizar el pais");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaises();
  }, []);
  return (
    <PaisContext.Provider
      value={{
        loading,
        currentPais,
        paises,
        methodsPais,
        handleClose,
        setCurrentPais,
        createPaises,
        updatePais,
        deletePais,
      }}
    >
      {children}
    </PaisContext.Provider>
  );
};
