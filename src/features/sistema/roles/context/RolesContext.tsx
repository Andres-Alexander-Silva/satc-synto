import { createContext, useState, useEffect } from "react";
import * as rolesServices from "@/features/sistema/roles/services/roles.services";
import { useForm } from "react-hook-form";
import {
  Roles,
  RolesForm,
  RolPermisoCheck,
  RolesPermisos,
} from "@/features/sistema/roles/interfaces/roles.interface";
import Swal from "sweetalert2";

interface RolesProviderProps {
  children: React.ReactNode;
}

interface RolesContextValues {
  loading: boolean;
  openRolPermiso: boolean;
  currentRoles: Roles;
  roles: Roles[];
  methodsRoles: any;
  handleOpenRolPermiso: () => void;
  handleCloseRolPermiso: () => void;
  handleClose: () => void;
  methodsRolPermiso: any;
  rolesPermisos: RolesPermisos[];
  assignPermisoRol: (permisos: RolPermisoCheck) => void;
  setCurrentRoles: (roles: Roles) => void;
  createRoles: (data: RolesForm) => void;
  getRolesByPermiso: (id: number) => void;
  updateRoles: (id: number, data: RolesForm) => void;
  deleteRoles: (id: number, estado: number) => void;
}

export const RolesContext = createContext<RolesContextValues>({
  loading: false,
  openRolPermiso: false,
  currentRoles: {} as Roles,
  roles: [],
  methodsRoles: {},
  rolesPermisos: [],
  methodsRolPermiso: {},
  handleOpenRolPermiso: () => {},
  handleCloseRolPermiso: () => {},
  handleClose: () => {},
  assignPermisoRol: (_permisos: RolPermisoCheck) => {},
  setCurrentRoles: (_roles: Roles) => {},
  createRoles: (_data: RolesForm) => {},
  getRolesByPermiso: (_id: number) => {},
  updateRoles: (_id: number, _data: RolesForm) => {},
  deleteRoles: (_id: number, _estado: number) => {},
});

export const RolesProvider = ({ children }: RolesProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [openRolPermiso, setOpenRolPermiso] = useState(false);
  const [currentRoles, setCurrentRoles] = useState({} as Roles);
  const [roles, setRoles] = useState<Roles[]>([]);
  const [rolesPermisos, setRolesPermisos] = useState<RolesPermisos[]>([]);
  const methodsRoles = useForm<RolesForm>();
  const methodsRolPermiso = useForm<RolPermisoCheck>();

  const handleOpenRolPermiso = () => {
    setOpenRolPermiso(true);
  };

  const handleCloseRolPermiso = () => {
    setOpenRolPermiso(false);
    setCurrentRoles({} as Roles);
    setRolesPermisos([]);
  };

  const handleClose = () => {
    setCurrentRoles({} as Roles);
    methodsRoles.reset();
  };

  const getRoles = async () => {
    try {
      setLoading(true);
      const { data } = await rolesServices.getRoles();
      setRoles(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRolesByPermiso = async (id: number) => {
    try {
      const { data } = await rolesServices.getRolPermiso(id);
      setRolesPermisos(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const assignPermisoRol = async (permisos: RolPermisoCheck) => {
    try {
      await rolesServices.assignPermisoRol(permisos);
      getRoles();
      Swal.fire({
        icon: "success",
        title: "Permisos asignados con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    }
  };

  const createRoles = async (data: RolesForm) => {
    try {
      setLoading(true);
      await rolesServices.createRoles(data);
      getRoles();
      Swal.fire({
        icon: "success",
        title: "Rol creado con éxito",
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

  const updateRoles = async (id: number, data: RolesForm) => {
    try {
      setLoading(true);
      await rolesServices.updateRoles(id, data);
      getRoles();
      Swal.fire({
        icon: "success",
        title: "Rol actualizado con éxito",
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

  const deleteRoles = async (id: number, estado: number) => {
    try {
      setLoading(true);
      const status = estado ? true : false;
      await rolesServices.deleteRoles(id, status);
      Swal.fire({
        icon: "success",
        title: "Estado actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getRoles();
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
    getRoles();
  }, []);
  return (
    <RolesContext.Provider
      value={{
        rolesPermisos,
        methodsRolPermiso,
        loading,
        openRolPermiso,
        currentRoles,
        roles,
        methodsRoles,
        assignPermisoRol,
        handleOpenRolPermiso,
        handleCloseRolPermiso,
        handleClose,
        setCurrentRoles,
        getRolesByPermiso,
        createRoles,
        updateRoles,
        deleteRoles,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};
