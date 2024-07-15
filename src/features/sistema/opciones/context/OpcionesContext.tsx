import { createContext, useState, useEffect, useContext } from "react";
import { UsuariosContext } from "@/features/usuarios/context/UsuariosContext";
import * as opcionesServices from "@/features/sistema/opciones/services/opciones.services";
import { useForm } from "react-hook-form";
import {
  OpcionesForm,
  Opciones,
} from "@/features/sistema/opciones/interface/opciones.interfaces";
import Swal from "sweetalert2";

interface OpcionesProviderProps {
  children: React.ReactNode;
}

interface OpcionesContextValues {
  loading: boolean;
  currentOpciones: Opciones;
  opciones: Opciones[];
  methodsOpciones: any;
  handleClose: () => void;
  setCurrentOpciones: (opciones: Opciones) => void;
  createOpciones: (data: OpcionesForm) => void;
  updateOpciones: (id: number, data: OpcionesForm) => void;
  deleteOpciones: (id: number, estado: boolean) => void;
}

export const OpcionesContext = createContext<OpcionesContextValues>({
  loading: false,
  currentOpciones: {} as Opciones,
  opciones: [],
  methodsOpciones: {},
  handleClose: () => {},
  setCurrentOpciones: (_opciones: Opciones) => {},
  createOpciones: (_data: OpcionesForm) => {},
  updateOpciones: (_id: number, _data: OpcionesForm) => {},
  deleteOpciones: (_id: number, _estado: boolean) => {},
});

export const OpcionesProvider = ({ children }: OpcionesProviderProps) => {
  const { getPermissions } = useContext(UsuariosContext);
  const [loading, setLoading] = useState(false);
  const [currentOpciones, setCurrentOpciones] = useState({} as Opciones);
  const [opciones, setOpciones] = useState<Opciones[]>([]);
  const methodsOpciones = useForm<OpcionesForm>();

  const handleClose = () => {
    setCurrentOpciones({} as Opciones);
    methodsOpciones.reset();
  };

  const getOpciones = async () => {
    try {
      setLoading(true);
      const { data } = await opcionesServices.getOpciones();
      setOpciones(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createOpciones = async (data: OpcionesForm) => {
    try {
      setLoading(true);
      await opcionesServices.createOpciones(data);
      Swal.fire({
        icon: "success",
        title: "Opcion creada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getOpciones();
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

  const updateOpciones = async (id: number, data: OpcionesForm) => {
    try {
      setLoading(true);
      await opcionesServices.updateOpciones(id, data);
      Swal.fire({
        icon: "success",
        title: "Opcion actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getOpciones();
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

  const deleteOpciones = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await opcionesServices.deleteOpciones(id, estado);
      Swal.fire({
        icon: "success",
        title: "Estado actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getOpciones();
      getPermissions();
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
    getOpciones();
  }, []);
  return (
    <OpcionesContext.Provider
      value={{
        loading,
        currentOpciones,
        opciones,
        methodsOpciones,
        handleClose,
        setCurrentOpciones,
        createOpciones,
        updateOpciones,
        deleteOpciones,
      }}
    >
      {children}
    </OpcionesContext.Provider>
  );
};
