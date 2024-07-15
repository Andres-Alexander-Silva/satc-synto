import { createContext, useState, useEffect } from "react";
import * as municipiosServices from "@/features/registro/municipios/services/municipios.services";
import { useForm } from "react-hook-form";
import {
  Municipios,
  MunicipiosForm,
} from "@/features/registro/municipios/interface/municipios.interface";
import Swal from "sweetalert2";

interface MunicipiosProviderProps {
  children: React.ReactNode;
}

interface MunicipiosContextValues {
  loading: boolean;
  currentMunicipios: Municipios;
  municipios: Municipios[];
  methodsMunicipios: any;
  handleClose: () => void;
  setCurrentMunicipios: (municipios: Municipios) => void;
  createMunicipios: (data: MunicipiosForm) => void;
  updateMunicipios: (id: number, data: MunicipiosForm) => void;
  deleteMunicipios: (id: number, estado: boolean) => void;
}

export const MunicipiosContext = createContext<MunicipiosContextValues>({
  loading: false,
  currentMunicipios: {} as Municipios,
  municipios: [],
  methodsMunicipios: {},
  handleClose: () => {},
  setCurrentMunicipios: (_municipios: Municipios) => {},
  createMunicipios: (_data: MunicipiosForm) => {},
  updateMunicipios: (_id: number, _data: MunicipiosForm) => {},
  deleteMunicipios: (_id: number, _estado: boolean) => {},
});

export const MunicipiosProvider = ({ children }: MunicipiosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [currentMunicipios, setCurrentMunicipios] = useState({} as Municipios);
  const methodsMunicipios = useForm<MunicipiosForm>();

  const handleClose = () => {
    setCurrentMunicipios({} as Municipios);
    methodsMunicipios.reset();
  };

  const getMunicipios = async () => {
    try {
      setLoading(true);
      const { data } = await municipiosServices.getMunicipios();
      setMunicipios(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createMunicipios = async (data: MunicipiosForm) => {
    try {
      setLoading(true);
      await municipiosServices.createMunicipios(data);
      Swal.fire({
        icon: "success",
        title: "Municipio creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMunicipios();
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

  const updateMunicipios = async (id: number, data: MunicipiosForm) => {
    try {
      setLoading(true);
      await municipiosServices.updateMunicipios(id, data);
      Swal.fire({
        icon: "success",
        title: "Municipio actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMunicipios();
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

  const deleteMunicipios = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await municipiosServices.deleteMunicipios(id, estado);
      Swal.fire({
        icon: "success",
        title: "Municipio actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMunicipios();
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
    getMunicipios();
  }, []);
  return (
    <MunicipiosContext.Provider
      value={{
        loading,
        currentMunicipios,
        municipios,
        methodsMunicipios,
        handleClose,
        setCurrentMunicipios,
        createMunicipios,
        updateMunicipios,
        deleteMunicipios,
      }}
    >
      {children}
    </MunicipiosContext.Provider>
  );
};
