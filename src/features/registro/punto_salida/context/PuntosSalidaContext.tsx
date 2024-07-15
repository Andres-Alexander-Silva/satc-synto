import { createContext, useState, useEffect } from "react";
import * as puntoSalidadServices from "@/features/registro/punto_salida/services/punto_salida.services";
import { useForm } from "react-hook-form";
import {
  PuntoSalidaForm,
  PuntoSalida,
} from "@/features/registro/punto_salida/interfaces/puntos_salida.interface";
import Swal from "sweetalert2";

interface PuntoSalidaProviderProps {
  children: React.ReactNode;
}

interface PuntoSalidaContextValues {
  loading: boolean;
  currentPuntoSalida: PuntoSalida;
  puntosSalida: PuntoSalida[];
  methodsPuntoSalida: any;
  handleClose: () => void;
  setCurrentPuntoSalida: (puntoSalida: PuntoSalida) => void;
  createPuntosSalida: (data: PuntoSalidaForm) => void;
  updatePuntosSalida: (id: number, data: PuntoSalidaForm) => void;
  deletePuntosSalida: (id: number, estado: boolean) => void;
}

export const PuntoSalidaContext = createContext<PuntoSalidaContextValues>({
  loading: false,
  currentPuntoSalida: {} as PuntoSalida,
  puntosSalida: [],
  methodsPuntoSalida: {},
  handleClose: () => {},
  setCurrentPuntoSalida: (_puntoSalida: PuntoSalida) => {},
  createPuntosSalida: (_data: PuntoSalidaForm) => {},
  updatePuntosSalida: (_id: number, _data: PuntoSalidaForm) => {},
  deletePuntosSalida: (_id: number, _estado: boolean) => {},
});

export const PuntoSalidaProvider = ({ children }: PuntoSalidaProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentPuntoSalida, setCurrentPuntoSalida] = useState(
    {} as PuntoSalida
  );
  const [puntosSalida, setPuntosSalida] = useState<PuntoSalida[]>([]);
  const methodsPuntoSalida = useForm<PuntoSalidaForm>();

  const handleClose = () => {
    setCurrentPuntoSalida({} as PuntoSalida);
    methodsPuntoSalida.reset();
  };

  const getPuntosSalida = async () => {
    try {
      setLoading(true);
      const { data } = await puntoSalidadServices.getPuntosSalida();

      setPuntosSalida(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPuntosSalida = async (data: PuntoSalidaForm) => {
    try {
      setLoading(true);
      await puntoSalidadServices.createPuntosSalida(data);
      Swal.fire({
        icon: "success",
        title: "Punto de salida creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getPuntosSalida();
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

  const updatePuntosSalida = async (id: number, data: PuntoSalidaForm) => {
    try {
      setLoading(true);
      await puntoSalidadServices.updatePuntosSalida(id, data);
      Swal.fire({
        icon: "success",
        title: "Punto de salida actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getPuntosSalida();
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

  const deletePuntosSalida = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await puntoSalidadServices.deletePuntosSalida(id, estado);
      Swal.fire({
        icon: "success",
        title: "Punto de salida deshabilitado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getPuntosSalida();
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
    getPuntosSalida();
  }, []);

  return (
    <PuntoSalidaContext.Provider
      value={{
        loading,
        currentPuntoSalida,
        puntosSalida,
        methodsPuntoSalida,
        handleClose,
        setCurrentPuntoSalida,
        createPuntosSalida,
        updatePuntosSalida,
        deletePuntosSalida,
      }}
    >
      {children}
    </PuntoSalidaContext.Provider>
  );
};
