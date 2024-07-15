import { useContext, useEffect } from "react";
import { MarcasContext } from "@/features/registro/marca/context/MarcasContext";
import { MarcasForm } from "@/features/registro/marca/interface/marcas.interfaces";

const useModalMarcas = () => {
  const {
    loading,
    handleClose,
    methodsMarcas,
    createMarcas,
    updateMarcas,
    currentMarcas,
  } = useContext(MarcasContext);

  const onSubmit = (data: MarcasForm) => {
    if (currentMarcas.id) {
      updateMarcas(currentMarcas.id, data);
    } else {
      createMarcas(data);
    }
  };

  useEffect(() => {
    if (currentMarcas.id) {
      methodsMarcas.setValue("nombre", currentMarcas.nombre);
    } else {
      methodsMarcas.setValue("nombre", "");
    }
  }, [currentMarcas]);

  return {
    loading,
    handleClose,
    methodsMarcas,
    onSubmit,
    currentMarcas,
  };
};

export default useModalMarcas;
