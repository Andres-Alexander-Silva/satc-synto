import { createContext, useState, useEffect } from "react";
import * as marcasServices from "@/features/registro/marca/services/marcas.services";
import { useForm } from "react-hook-form";
import {
  Marcas,
  MarcasForm,
} from "@/features/registro/marca/interface/marcas.interfaces";
import Swal from "sweetalert2";

interface MarcasProviderProps {
  children: React.ReactNode;
}

interface MarcasContextValues {
  loading: boolean;
  currentMarcas: Marcas;
  marcas: Marcas[];
  methodsMarcas: any;
  handleClose: () => void;
  setCurrentMarcas: (marcas: Marcas) => void;
  createMarcas: (data: MarcasForm) => void;
  updateMarcas: (id: number, data: MarcasForm) => void;
  deleteMarcas: (id: number, estado: boolean) => void;
}

export const MarcasContext = createContext<MarcasContextValues>({
  loading: false,
  currentMarcas: {} as Marcas,
  marcas: [],
  methodsMarcas: {},
  handleClose: () => {},
  setCurrentMarcas: (_marcas: Marcas) => {},
  createMarcas: (_data: MarcasForm) => {},
  updateMarcas: (_id: number, _data: MarcasForm) => {},
  deleteMarcas: (_id: number, _estado: boolean) => {},
});

export const MarcasProvider = ({ children }: MarcasProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentMarcas, setCurrentMarcas] = useState({} as Marcas);
  const [marcas, setMarcas] = useState<Marcas[]>([]);
  const methodsMarcas = useForm<MarcasForm>();

  const handleClose = () => {
    setCurrentMarcas({} as Marcas);
    methodsMarcas.reset();
  };

  const getMarcas = async () => {
    try {
      setLoading(true);
      const { data } = await marcasServices.getMarcas();
      setMarcas(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createMarcas = async (data: MarcasForm) => {
    try {
      setLoading(true);
      await marcasServices.createMarcas(data);
      getMarcas();
      Swal.fire({
        icon: "success",
        title: "Marca creada con éxito",
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMarcas = async (id: number, data: MarcasForm) => {
    try {
      setLoading(true);
      await marcasServices.updateMarcas(id, data);
      getMarcas();
      Swal.fire({
        icon: "success",
        title: "Marca actualizada con éxito",
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMarcas = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      const status = estado ? true : false;
      await marcasServices.deleteMarcas(id, status);
      Swal.fire({
        icon: "success",
        title: "Marca actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMarcas();
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
    getMarcas();
  }, []);
  return (
    <MarcasContext.Provider
      value={{
        loading,
        currentMarcas,
        marcas,
        methodsMarcas,
        handleClose,
        setCurrentMarcas,
        createMarcas,
        updateMarcas,
        deleteMarcas,
      }}
    >
      {children}
    </MarcasContext.Provider>
  );
};
