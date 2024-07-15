import { useContext, useEffect } from "react";
import { TiposVehiculosContext } from "@/features/registro/tipo_vehiculo/context/TiposVehiculosContext";
import { TiposVehiculosForm } from "@/features/registro/tipo_vehiculo/interface/tipos_vehiculos.interface";

const useModalTipoVehiculos = () => {
  const {
    loading,
    handleClose,
    methodsTipoVehiculo,
    createTiposVehiculos,
    updateTiposVehiculos,
    currentTipoVehiculo,
  } = useContext(TiposVehiculosContext);

  const onSubmit = (data: TiposVehiculosForm) => {
    if (currentTipoVehiculo.id) {
      updateTiposVehiculos(currentTipoVehiculo.id, data);
    } else {
      createTiposVehiculos(data);
    }
  };

  useEffect(() => {
    if (currentTipoVehiculo.id) {
      methodsTipoVehiculo.setValue("nombre", currentTipoVehiculo.nombre);
    } else {
      methodsTipoVehiculo.setValue("nombre", "");
    }
  }, [currentTipoVehiculo]);

  return {
    loading,
    handleClose,
    methodsTipoVehiculo,
    onSubmit,
    currentTipoVehiculo,
  };
};

export default useModalTipoVehiculos;
