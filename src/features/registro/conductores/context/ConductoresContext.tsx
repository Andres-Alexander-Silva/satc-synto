import { createContext, useState, useEffect } from "react";
import * as conductoresServices from "@/features/registro/conductores/services/conductores.services";
import { useForm } from "react-hook-form";
import {
  ConductoresForm,
  Conductores,
} from "@/features/registro/conductores/interfaces/conductores.interface";
import Swal from "sweetalert2";

interface ConductoresProviderProps {
  children: React.ReactNode;
}

interface ConductoresContextValues {
  loading: boolean;
  currentConductores: Conductores;
  conductores: Conductores[];
  methodsConductores: any;
  handleClose: () => void;
  setCurrentConductores: (conductores: Conductores) => void;
  createConductores: (data: ConductoresForm) => void;
  updateConductores: (id: number, data: ConductoresForm) => void;
  deleteConductores: (id: number, estado: number) => void;
  findDocumentoConductor: (documento: string) => void;
}

export const ConductoresContext = createContext<ConductoresContextValues>({
  loading: false,
  currentConductores: {} as Conductores,
  conductores: [],
  methodsConductores: {},
  handleClose: () => {},
  setCurrentConductores: (_conductores: Conductores) => {},
  createConductores: (_data: ConductoresForm) => {},
  updateConductores: (_id: number, _data: ConductoresForm) => {},
  deleteConductores: (_id: number, _estado: number) => {},
  findDocumentoConductor: (_documento: string) => {},
});

export const ConductoresProvider = ({ children }: ConductoresProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentConductores, setCurrentConductores] = useState(
    {} as Conductores
  );
  const [conductores, setConductores] = useState<Conductores[]>([]);
  const methodsConductores = useForm<ConductoresForm>();

  const handleClose = () => {
    setCurrentConductores({} as Conductores);
    methodsConductores.reset();
  };

  const getConductores = async () => {
    try {
      setLoading(true);
      const { data } = await conductoresServices.getConductores();
      setConductores(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findDocumentoConductor = async (documento: string) => {
    try {
      const { data } = await conductoresServices.findDocumetnoConductor(
        documento
      );
      if (data.response === true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El documento ya se encuetra registrado",
          customClass: {
            container: "swal2-container",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createConductores = async (data: ConductoresForm) => {
    try {
      setLoading(true);
      await conductoresServices.createConductores(data);
      Swal.fire({
        icon: "success",
        title: "Conductor creado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getConductores();
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

  const updateConductores = async (id: number, data: ConductoresForm) => {
    try {
      setLoading(true);
      await conductoresServices.updateConductores(id, data);
      Swal.fire({
        icon: "success",
        title: "Conductor actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getConductores();
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

  const deleteConductores = async (id: number, estado: number) => {
    try {
      setLoading(true);
      const status = estado ? true : false;
      await conductoresServices.deleteConductores(id, status);
      Swal.fire({
        icon: "success",
        title: "Conductor actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getConductores();
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
    getConductores();
  }, []);

  return (
    <ConductoresContext.Provider
      value={{
        findDocumentoConductor,
        loading,
        currentConductores,
        conductores,
        methodsConductores,
        handleClose,
        setCurrentConductores,
        createConductores,
        updateConductores,
        deleteConductores,
      }}
    >
      {children}
    </ConductoresContext.Provider>
  );
};
