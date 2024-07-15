import { useContext, useEffect } from "react";
import { RolesContext } from "@/features/sistema/roles/context/RolesContext";
import { RolesForm } from "@/features/sistema/roles/interfaces/roles.interface";

const useModalRoles = () => {
  const {
    loading,
    handleClose,
    methodsRoles,
    createRoles,
    updateRoles,
    currentRoles,
  } = useContext(RolesContext);

  const onSubmit = (data: RolesForm) => {
    if (currentRoles.id) {
      updateRoles(currentRoles.id, data);
    } else {
      createRoles(data);
    }
  };

  useEffect(() => {
    if (currentRoles.id) {
      methodsRoles.setValue("nombre", currentRoles.nombre);
      methodsRoles.setValue("descripcion", currentRoles.descripcion);
    } else {
      methodsRoles.setValue("nombre", "");
      methodsRoles.setValue("descripcion", "");
    }
  }, [currentRoles]);

  return {
    loading,
    handleClose,
    methodsRoles,
    onSubmit,
    currentRoles,
  };
};

export default useModalRoles;
