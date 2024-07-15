import { createContext, useState, useEffect } from "react";
import * as tiposVehiculosServices from "@/features/registro/tipo_vehiculo/services/tipos_vehiculos.services";
import { useForm } from "react-hook-form";
import {
  TiposVehiculosForm,
  TiposVehiculos,
} from "@/features/registro/tipo_vehiculo/interface/tipos_vehiculos.interface";
import Swal from "sweetalert2";

interface TipoVehiculosProviderProps {
  children: React.ReactNode;
}

interface TiposVehiculosContextValues {
  loading: boolean;
  currentTipoVehiculo: TiposVehiculos;
  tiposVehiculos: TiposVehiculos[];
  methodsTipoVehiculo: any;
  handleClose: () => void;
  setCurrentTipoVehiculo: (tipoVehiculo: TiposVehiculos) => void;
  createTiposVehiculos: (data: TiposVehiculosForm) => void;
  updateTiposVehiculos: (id: number, data: TiposVehiculosForm) => void;
  deleteTiposVehiculos: (id: number, estado: boolean) => void;
}

export const TiposVehiculosContext = createContext<TiposVehiculosContextValues>(
  {
    loading: false,
    currentTipoVehiculo: {} as TiposVehiculos,
    tiposVehiculos: [],
    methodsTipoVehiculo: {},
    handleClose: () => {},
    setCurrentTipoVehiculo: (_tipoVehiculo: TiposVehiculos) => {},
    createTiposVehiculos: (_data: TiposVehiculosForm) => {},
    updateTiposVehiculos: (_id: number, _data: TiposVehiculosForm) => {},
    deleteTiposVehiculos: (_id: number, _estado: boolean) => {},
  }
);

export const TiposVehiculosProvider = ({
  children,
}: TipoVehiculosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentTipoVehiculo, setCurrentTipoVehiculo] = useState(
    {} as TiposVehiculos
  );
  const [tiposVehiculos, setTiposVehiculos] = useState<TiposVehiculos[]>([]);
  const methodsTipoVehiculo = useForm<TiposVehiculosForm>();

  const handleClose = () => {
    setCurrentTipoVehiculo({} as TiposVehiculos);
    methodsTipoVehiculo.reset();
  };

  const getTiposVehiculos = async () => {
    try {
      setLoading(true);
      const { data } = await tiposVehiculosServices.getTiposVehiculos();
      setTiposVehiculos(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTiposVehiculos = async (data: TiposVehiculosForm) => {
    try {
      setLoading(true);
      await tiposVehiculosServices.createTipoVeiculo(data);
      getTiposVehiculos();
      Swal.fire({
        icon: "success",
        title: "Tipo vehiculo creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTiposVehiculos = async (id: number, data: TiposVehiculosForm) => {
    try {
      setLoading(true);
      await tiposVehiculosServices.updateTipoVeiculo(id, data);
      getTiposVehiculos();
      Swal.fire({
        icon: "success",
        title: "Tipo vehiculo actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTiposVehiculos = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await tiposVehiculosServices.deleteTipoVeiculo(id, estado);
      Swal.fire({
        icon: "success",
        title: "Tipo vehiculo actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getTiposVehiculos();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTiposVehiculos();
  }, []);

  return (
    <TiposVehiculosContext.Provider
      value={{
        loading,
        currentTipoVehiculo,
        tiposVehiculos,
        methodsTipoVehiculo,
        handleClose,
        setCurrentTipoVehiculo,
        createTiposVehiculos,
        updateTiposVehiculos,
        deleteTiposVehiculos,
      }}
    >
      {children}
    </TiposVehiculosContext.Provider>
  );
};
