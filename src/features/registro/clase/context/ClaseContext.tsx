import { createContext, useState, useEffect } from "react";
import * as claseServices from "@/features/registro/clase/services/clase.services";
import { useForm } from "react-hook-form";
import {
  ClaseForm,
  Clase,
} from "@/features/registro/clase/interface/clase.interface";
import Swal from "sweetalert2";

interface ClaseProviderProps {
  children: React.ReactNode;
}

export interface ClaseContextValues {
  loading: boolean;
  currentClase: Clase;
  clase: Clase[];
  methodsClase: any;
  handleClose: () => void;
  setCurrentClase: (clase: Clase) => void;
  createClase: (data: ClaseForm) => void;
  updateClase: (id: number, data: ClaseForm) => void;
  deleteClase: (id: number, estado: boolean) => void;
}

export const ClaseContext = createContext<ClaseContextValues>({
  loading: false,
  currentClase: {} as Clase,
  clase: [],
  methodsClase: {},
  handleClose: () => {},
  setCurrentClase: (_clase: Clase) => {},
  createClase: (_data: ClaseForm) => {},
  updateClase: (_id: number, _data: ClaseForm) => {},
  deleteClase: (_id: number, _estado: boolean) => {},
});

export const ClaseProvider = ({ children }: ClaseProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentClase, setCurrentClase] = useState({} as Clase);
  const [clase, setClase] = useState<Clase[]>([]);
  const methodsClase = useForm<ClaseForm>();

  const handleClose = () => {
    setCurrentClase({} as Clase);
    methodsClase.reset();
  };

  const getClase = async () => {
    try {
      const { data } = await claseServices.getClases();
      setClase(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const createClase = async (data: ClaseForm) => {
    try {
      setLoading(true);
      await claseServices.createClases(data);
      Swal.fire({
        icon: "success",
        title: "Clase creada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getClase();
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

  const updateClase = async (id: number, data: ClaseForm) => {
    try {
      setLoading(true);
      await claseServices.updateClases(data, id);
      Swal.fire({
        icon: "success",
        title: "Clase actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getClase();
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

  const deleteClase = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await claseServices.deleteClases(id, estado);
      Swal.fire({
        icon: "success",
        title: "Clase actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getClase();
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

  useEffect(() => {
    getClase();
  }, []);
  return (
    <ClaseContext.Provider
      value={{
        loading,
        currentClase,
        clase,
        methodsClase,
        handleClose,
        setCurrentClase,
        createClase,
        updateClase,
        deleteClase,
      }}
    >
      {children}
    </ClaseContext.Provider>
  );
};
