import { useContext } from "react";
import { RolesContext } from "@/features/sistema/roles/context/RolesContext";

const useModalRolPermiso = () => {
  const {
    assignPermisoRol,
    openRolPermiso,
    handleCloseRolPermiso,
    methodsRolPermiso,
    rolesPermisos,
    currentRoles,
  } = useContext(RolesContext);

  const dispatchPermissions = (
    name: string,
    opcion: number,
    estado: boolean
  ) => {
    const formatObjetoDeseado = {
      primaryId: opcion,
      value: estado,
      rm: name,
      rol: currentRoles.id,
    };
    assignPermisoRol(formatObjetoDeseado);
  };

  const formatRolByMenu = () => {
    const opcionesPorMenu: {
      [menuName: string]: {
        id: number;
        menu: any;
        opciones: any[];
      };
    } = {};

    rolesPermisos.forEach((opcion) => {
      const menuName = opcion.opcion.menu.nombre;
      if (!opcionesPorMenu[menuName]) {
        opcionesPorMenu[menuName] = {
          id: opcion.id,
          menu: opcion.opcion.menu,
          opciones: [],
        };
      }
      opcionesPorMenu[menuName].opciones.push(opcion);
    });

    return opcionesPorMenu;
  };

  const rol = formatRolByMenu();

  return {
    rol,
    openRolPermiso,
    handleCloseRolPermiso,
    methodsRolPermiso,
    dispatchPermissions,
  };
};

export default useModalRolPermiso;
