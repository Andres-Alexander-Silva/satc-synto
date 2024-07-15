import { createContext, useState, useEffect } from "react";
import * as departamentosServices from "@/features/registro/departamentos/services/departamentos.services";
import { useForm } from "react-hook-form";
import {
  DepartamentosForm,
  Departamentos,
} from "@/features/registro/departamentos/interfaces/departamentos.interfaces";
import Swal from "sweetalert2";

interface DepartamentosProviderProps {
  children: React.ReactNode;
}

interface DepartamentosContextValues {
  loading: boolean;
  currentDepartamentos: Departamentos;
  departamentos: Departamentos[];
  methodsDepartamentos: any;
  handleClose: () => void;
  setCurrentDepartamentos: (departamentos: Departamentos) => void;
  createDepartamentos: (data: DepartamentosForm) => void;
  updateDepartamentos: (id: number, data: DepartamentosForm) => void;
  deleteDepartamento: (id: number, estado: boolean) => void;
}

export const DepartamentosContext = createContext<DepartamentosContextValues>({
  loading: false,
  currentDepartamentos: {} as Departamentos,
  departamentos: [],
  methodsDepartamentos: {},
  handleClose: () => {},
  setCurrentDepartamentos: (_departamentos: Departamentos) => {},
  createDepartamentos: (_data: DepartamentosForm) => {},
  updateDepartamentos: (_id: number, _data: DepartamentosForm) => {},
  deleteDepartamento: (_id: number, _estado: boolean) => {},
});

export const DepartamentosProvider = ({
  children,
}: DepartamentosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentDepartamentos, setCurrentDepartamentos] = useState(
    {} as Departamentos
  );
  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  const methodsDepartamentos = useForm<DepartamentosForm>();

  const handleClose = () => {
    setCurrentDepartamentos({} as Departamentos);
    methodsDepartamentos.reset();
  };

  const getDepartamentos = async () => {
    try {
      setLoading(true);
      const { data } = await departamentosServices.getDepartamentos();
      setDepartamentos(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createDepartamentos = async (data: DepartamentosForm) => {
    try {
      setLoading(true);
      await departamentosServices.createDepartamento(data);
      getDepartamentos();
      Swal.fire({
        icon: "success",
        title: "Departamento creado con éxito",
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

  const updateDepartamentos = async (id: number, data: DepartamentosForm) => {
    try {
      setLoading(true);
      await departamentosServices.updateDepartamento(id, data);
      getDepartamentos();
      Swal.fire({
        icon: "success",
        title: "Departamento actualizado con éxito",
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

  const deleteDepartamento = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await departamentosServices.deleteDepartamento(id, estado);
      Swal.fire({
        icon: "success",
        title: "Se cambio el estado del departamento con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getDepartamentos();
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
    getDepartamentos();
  }, []);
  return (
    <DepartamentosContext.Provider
      value={{
        loading,
        currentDepartamentos,
        departamentos,
        methodsDepartamentos,
        handleClose,
        setCurrentDepartamentos,
        createDepartamentos,
        updateDepartamentos,
        deleteDepartamento,
      }}
    >
      {children}
    </DepartamentosContext.Provider>
  );
};
