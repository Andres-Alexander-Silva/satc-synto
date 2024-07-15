import { createContext, useState, useEffect } from "react";
import * as icoTermsServices from "@/features/registro/iconterms/services/icoterms.services";
import { useForm } from "react-hook-form";
import {
  IcotermsForm,
  Icoterms,
} from "@/features/registro/iconterms/interfaces/icoterms.interface";
import Swal from "sweetalert2";

interface IcotermsProviderProps {
  children: React.ReactNode;
}

interface IcotermsContextValues {
  loading: boolean;
  currentIcoterms: Icoterms;
  icoterms: Icoterms[];
  methodsIcoterms: any;
  handleClose: () => void;
  setCurrentIcoterms: (icoterms: Icoterms) => void;
  createIcoterms: (data: IcotermsForm) => void;
  updateIcoterm: (id: number, data: IcotermsForm) => void;
  deleteIcoterms: (id: number, estado: boolean) => void;
}

export const IcotermsContext = createContext<IcotermsContextValues>({
  loading: false,
  currentIcoterms: {} as Icoterms,
  icoterms: [],
  methodsIcoterms: {},
  handleClose: () => {},
  setCurrentIcoterms: (_icoterms: Icoterms) => {},
  createIcoterms: (_data: IcotermsForm) => {},
  updateIcoterm: (_id: number, _data: IcotermsForm) => {},
  deleteIcoterms: (_id: number, _estado: boolean) => {},
});

export const IcotermsProvider = ({ children }: IcotermsProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentIcoterms, setCurrentIcoterms] = useState({} as Icoterms);
  const [icoterms, setIcoterms] = useState<Icoterms[]>([]);
  const methodsIcoterms = useForm<IcotermsForm>();

  const handleClose = () => {
    setCurrentIcoterms({} as Icoterms);
    methodsIcoterms.reset();
  };

  const getIcoterms = async () => {
    try {
      setLoading(true);
      const { data } = await icoTermsServices.getIcoterms();
      setIcoterms(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createIcoterms = async (data: IcotermsForm) => {
    try {
      setLoading(true);
      await icoTermsServices.createIcoterms(data);
      Swal.fire({
        icon: "success",
        title: "Iconterms creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getIcoterms();
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

  const updateIcoterm = async (id: number, data: IcotermsForm) => {
    try {
      setLoading(true);
      await icoTermsServices.updateIcoTerms(id, data);
      Swal.fire({
        icon: "success",
        title: "Iconterms actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getIcoterms();
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

  const deleteIcoterms = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await icoTermsServices.deleteIcoTerms(id, estado);
      Swal.fire({
        icon: "success",
        title: "Iconterms actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getIcoterms();
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
    getIcoterms();
  }, []);
  return (
    <IcotermsContext.Provider
      value={{
        loading,
        currentIcoterms,
        icoterms,
        methodsIcoterms,
        handleClose,
        setCurrentIcoterms,
        createIcoterms,
        updateIcoterm,
        deleteIcoterms,
      }}
    >
      {children}
    </IcotermsContext.Provider>
  );
};
