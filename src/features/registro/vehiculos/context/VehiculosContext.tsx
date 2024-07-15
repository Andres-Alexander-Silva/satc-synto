import { createContext, useState, useEffect } from "react";
import * as vehiculosServices from "@/features/registro/vehiculos/services/vehiculos.services";
import { useForm } from "react-hook-form";
import {
  VehiculosForm,
  Vehiculos,
} from "@/features/registro/vehiculos/interfaces/vehiculos.interface";
import Swal from "sweetalert2";

interface VehiculosProviderProps {
  children: React.ReactNode;
}

interface VehiculosContextValues {
  loading: boolean;
  currentVehiculos: Vehiculos;
  vehiculos: Vehiculos[];
  methodsVehiculos: any;
  handleClose: () => void;
  setCurrentVehiculos: (vehiculos: Vehiculos) => void;
  createVehiculos: (data: VehiculosForm) => void;
  updateVehiculos: (id: number, data: VehiculosForm) => void;
  deleteVehiculos: (id: number, estado: boolean) => void;
  findPlaca: (placa: string) => void;
}

export const VehiculosContext = createContext<VehiculosContextValues>({
  loading: false,
  currentVehiculos: {} as Vehiculos,
  vehiculos: [],
  methodsVehiculos: {},
  handleClose: () => {},
  setCurrentVehiculos: (_vehiculos: Vehiculos) => {},
  createVehiculos: (_data: VehiculosForm) => {},
  updateVehiculos: (_id: number, _data: VehiculosForm) => {},
  deleteVehiculos: (_id: number, _estado: boolean) => {},
  findPlaca: (_placa: string) => {},
});

export const VehiculosProvider = ({ children }: VehiculosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentVehiculos, setCurrentVehiculos] = useState({} as Vehiculos);
  const [vehiculos, setVehiculos] = useState<Vehiculos[]>([]);
  const methodsVehiculos = useForm<VehiculosForm>();

  const handleClose = () => {
    setCurrentVehiculos({} as Vehiculos);
    methodsVehiculos.reset();
  };

  const getVehiculos = async () => {
    setLoading(true);
    try {
      const { data } = await vehiculosServices.getVehiculos();
      setVehiculos(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createVehiculos = async (data: VehiculosForm) => {
    setLoading(true);
    try {
      await vehiculosServices.createVehiculos(data);
      Swal.fire({
        icon: "success",
        title: "Vehiculo creado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getVehiculos();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateVehiculos = async (id: number, data: VehiculosForm) => {
    setLoading(true);
    try {
      await vehiculosServices.updateVehiculos(id, data);
      Swal.fire({
        icon: "success",
        title: "Vehiculo actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getVehiculos();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findPlaca = async (placa: string) => {
    try {
      const { data } = await vehiculosServices.findPlaca(placa);
      if (data.response === true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La placa ya se encuentra registrada",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVehiculos = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await vehiculosServices.deleteVehiculos(id, estado);
      Swal.fire({
        icon: "success",
        title: "Vehiculo actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getVehiculos();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehiculos();
  }, []);

  return (
    <VehiculosContext.Provider
      value={{
        findPlaca,
        loading,
        currentVehiculos,
        vehiculos,
        methodsVehiculos,
        handleClose,
        setCurrentVehiculos,
        createVehiculos,
        updateVehiculos,
        deleteVehiculos,
      }}
    >
      {children}
    </VehiculosContext.Provider>
  );
};
