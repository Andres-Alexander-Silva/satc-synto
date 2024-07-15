import { createContext, useState, useEffect } from "react";
import * as usuariosServices from "@/features/configuracion/usuarios/services/usuarios.services";
import { useForm } from "react-hook-form";
import {
  UsuariosForm,
  Usuarios,
  Generos,
} from "@/features/configuracion/usuarios/interfaces/usuarios.interface";
import Swal from "sweetalert2";

interface UsuariosProviderProps {
  children: React.ReactNode;
}

interface UsuariosContextValues {
  loading: boolean;
  currentUsuarios: Usuarios;
  usuarios: Usuarios[];
  generos: Generos[];
  methodsUsuarios: any;
  handleClose: () => void;
  setCurrentUsuarios: (usuarios: Usuarios) => void;
  createUsuarios: (data: UsuariosForm) => void;
  updateUsuarios: (id: number, data: UsuariosForm) => void;
  deleteUsuarios: (id: number, estado: boolean) => void;
}

export const UsuariosContext = createContext<UsuariosContextValues>({
  loading: false,
  currentUsuarios: {} as Usuarios,
  usuarios: [],
  generos: [],
  methodsUsuarios: {},
  handleClose: () => {},
  setCurrentUsuarios: (_usuarios: Usuarios) => {},
  createUsuarios: (_data: UsuariosForm) => {},
  updateUsuarios: (_id: number, _data: UsuariosForm) => {},
  deleteUsuarios: (_id: number, _estado: boolean) => {},
});

export const UsuariosProvider = ({ children }: UsuariosProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentUsuarios, setCurrentUsuarios] = useState({} as Usuarios);
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [generos, setGeneros] = useState<Generos[]>([]); // [1
  const methodsUsuarios = useForm<UsuariosForm>();

  const handleClose = () => {
    setCurrentUsuarios({} as Usuarios);
    localStorage.removeItem("file");
    methodsUsuarios.reset();
    getUsuarios();
  };

  const getUsuarios = async () => {
    try {
      setLoading(true);
      const { data } = await usuariosServices.getUsuarios();
      setUsuarios(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getGeneros = async () => {
    try {
      setLoading(true);
      const { data } = await usuariosServices.getGeneros();
      setGeneros(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createUsuarios = async (data: UsuariosForm) => {
    try {
      setLoading(true);
      await usuariosServices.createUsuarios(data);
      Swal.fire({
        icon: "success",
        title: "Usuario creado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getUsuarios();
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

  const updateUsuarios = async (id: number, data: UsuariosForm) => {
    try {
      setLoading(true);
      await usuariosServices.updateUsuarios(id, data);
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      handleClose();
      getUsuarios();
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

  const deleteUsuarios = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await usuariosServices.deleteUsuarios(id, estado);
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado satisfactoriamente",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getUsuarios();
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
    getUsuarios();
    getGeneros();
  }, []);

  return (
    <UsuariosContext.Provider
      value={{
        loading,
        currentUsuarios,
        usuarios,
        generos,
        methodsUsuarios,
        handleClose,
        setCurrentUsuarios,
        createUsuarios,
        updateUsuarios,
        deleteUsuarios,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
