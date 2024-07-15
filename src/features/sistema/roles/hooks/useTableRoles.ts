import { useContext, useState } from "react";
import { RolesContext } from "@/features/sistema/roles/context/RolesContext";
import { Roles } from "@/features/sistema/roles/interfaces/roles.interface";

const useTableRoles = () => {
  const {
    roles,
    loading,
    deleteRoles,
    setCurrentRoles,
    handleOpenRolPermiso,
    getRolesByPermiso,
  } = useContext(RolesContext);

  const [search, setSearch] = useState("");

  const searchRol = () => {
    return roles.filter((rol) => {
      const nombreMatches = rol.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || nombreMatches;
    });
  };

  const open = (role: Roles) => {
    setCurrentRoles(role);
  };

  const handleOpenRolPermisoModal = (role: Roles) => {
    getRolesByPermiso(role.id);
    setCurrentRoles(role);
    handleOpenRolPermiso();
  };

  return {
    loading,
    deleteRoles,
    open,
    search,
    setSearch,
    searchRol,
    handleOpenRolPermisoModal,
    getRolesByPermiso,
  };
};

export default useTableRoles;
