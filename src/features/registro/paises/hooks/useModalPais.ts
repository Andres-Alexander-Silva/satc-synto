import { useContext, useEffect } from "react";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { PaisForm } from "@/features/registro/paises/interfaces/pais.interface";

const useModalPais = () => {
  const {
    loading,
    methodsPais,
    createPaises,
    updatePais,
    currentPais,
    handleClose,
  } = useContext(PaisContext);

  const onSubmit = (data: PaisForm) => {
    if (currentPais.id) {
      updatePais(currentPais.id, data);
    } else {
      createPaises(data);
    }
  };

  useEffect(() => {
    if (currentPais.id) {
      methodsPais.setValue("nombre", currentPais.nombre);
    } else {
      methodsPais.setValue("nombre", "");
    }
  }, [currentPais]);

  return {
    loading,
    methodsPais,
    onSubmit,
    currentPais,
    handleClose,
  };
};

export default useModalPais;
