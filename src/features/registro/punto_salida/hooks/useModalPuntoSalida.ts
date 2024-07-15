import { useContext, useEffect } from "react";
import { PuntoSalidaContext } from "@/features/registro/punto_salida/context/PuntosSalidaContext";
import { PuntoSalidaForm } from "@/features/registro/punto_salida/interfaces/puntos_salida.interface";

const useModalPuntoSalida = () => {
  const {
    loading,
    handleClose,
    methodsPuntoSalida,
    createPuntosSalida,
    updatePuntosSalida,
    currentPuntoSalida,
  } = useContext(PuntoSalidaContext);

  const onSubmit = (data: PuntoSalidaForm) => {
    const newData = {
      ...data,
      nombre: data.nombre.toUpperCase(),
    };
    if (currentPuntoSalida.id) {
      updatePuntosSalida(currentPuntoSalida.id, newData);
    } else {
      createPuntosSalida(newData);
    }
  };

  useEffect(() => {
    if (currentPuntoSalida.id) {
      methodsPuntoSalida.setValue("nombre", currentPuntoSalida.nombre);
    } else {
      methodsPuntoSalida.setValue("nombre", "");
    }
  }, [currentPuntoSalida]);

  return {
    loading,
    open,
    handleClose,
    methodsPuntoSalida,
    onSubmit,
    currentPuntoSalida,
  };
};

export default useModalPuntoSalida;
