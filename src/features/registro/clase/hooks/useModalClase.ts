import { useContext, useEffect } from "react";
import { ClaseContext } from "@/features/registro/clase/context/ClaseContext";
import { ClaseForm } from "@/features/registro/clase/interface/clase.interface";

const useModalClase = () => {
  const {
    loading,
    handleClose,
    createClase,
    updateClase,
    methodsClase,
    currentClase,
  } = useContext(ClaseContext);

  const onSubmit = (data: ClaseForm) => {
    if (currentClase.id) {
      updateClase(currentClase.id, data);
    } else {
      createClase(data);
    }
  };

  useEffect(() => {
    if (currentClase.id) {
      methodsClase.setValue("nombre", currentClase.nombre);
    } else {
      methodsClase.setValue("nombre", "");
    }
  }, [currentClase]);

  return {
    loading,
    handleClose,
    onSubmit,
    methodsClase,
    currentClase,
  };
};

export default useModalClase;
