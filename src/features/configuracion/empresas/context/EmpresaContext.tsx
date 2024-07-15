import { createContext, useState, useEffect } from "react";
import * as empresaServices from "@/features/configuracion/empresas/services/empresas.services";
import { useForm } from "react-hook-form";
import {
  EmpresaForm,
  Empresa,
  EmpresaFind,
} from "@/features/configuracion/empresas/interfaces/empresas.interface";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const cookies = new Cookies();

interface EmpresaProviderProps {
  children: React.ReactNode;
}

interface EmpresaContextValues {
  loading: boolean;
  currentEmpresa: Empresa;
  empresas: Empresa[];
  empresaFind: EmpresaFind;
  methodsEmpresa: any;
  handleClose: () => void;
  getEmpresas: () => void;
  setCurrentEmpresa: (empresa: Empresa) => void;
  createEmpresas: (data: EmpresaForm) => void;
  updateEmpresas: (id: number, data: EmpresaForm) => void;
  deleteEmpresas: (id: number, estado: boolean) => void;
}

export const EmpresaContext = createContext<EmpresaContextValues>({
  loading: false,
  currentEmpresa: {} as Empresa,
  empresaFind: {} as EmpresaFind,
  empresas: [],
  setCurrentEmpresa: (_empresa: Empresa) => {},
  methodsEmpresa: null,
  handleClose: () => {},
  getEmpresas: () => {},
  createEmpresas: () => {},
  updateEmpresas: () => {},
  deleteEmpresas: () => {},
});

export const EmpresaProvider = ({ children }: EmpresaProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentEmpresa, setCurrentEmpresa] = useState({} as Empresa);
  const [empresaFind, setEmpresaFind] = useState({} as EmpresaFind);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const methodsEmpresa = useForm<EmpresaForm>();

  const handleClose = () => {
    setCurrentEmpresa({} as Empresa);
    methodsEmpresa.reset();
    localStorage.removeItem("file");
  };

  const getEmpresas = async () => {
    try {
      setLoading(true);
      const { data } = await empresaServices.getEmpresas();
      setEmpresas(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const findEmpresa = async () => {
    try {
      setLoading(true);
      const id = cookies.get("empresa");
      const { data } = await empresaServices.findEmpresa(id);
      setEmpresaFind(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createEmpresas = async (data: EmpresaForm) => {
    try {
      setLoading(true);
      await empresaServices.createEmpresas(data);
      getEmpresas();
      Swal.fire({
        icon: "success",
        title: "Empresa creada satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      cookies.remove("file");
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      console.error(error);
      cookies.remove("file");
    } finally {
      setLoading(false);
    }
  };

  const updateEmpresas = async (id: number, data: EmpresaForm) => {
    try {
      setLoading(true);
      await empresaServices.updateEmpresas(id, data);
      getEmpresas();
      Swal.fire({
        icon: "success",
        title: "Empresa actualizada satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      localStorage.removeItem("file");
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      localStorage.removeItem("file");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmpresas = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await empresaServices.deleteEmpresas(id, estado);
      Swal.fire({
        icon: "success",
        title: "Empresa actualizada satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getEmpresas();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.response,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findEmpresa();
    getEmpresas();
  }, []);
  return (
    <EmpresaContext.Provider
      value={{
        loading,
        empresaFind,
        currentEmpresa,
        setCurrentEmpresa,
        empresas,
        methodsEmpresa,
        handleClose,
        getEmpresas,
        createEmpresas,
        updateEmpresas,
        deleteEmpresas,
      }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};
