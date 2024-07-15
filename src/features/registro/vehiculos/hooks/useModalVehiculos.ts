import { useContext, useEffect } from "react";
import { VehiculosContext } from "@/features/registro/vehiculos/context/VehiculosContext";
import { MarcasContext } from "@/features/registro/marca/context/MarcasContext";
import { TiposVehiculosContext } from "@/features/registro/tipo_vehiculo/context/TiposVehiculosContext";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { VehiculosForm } from "@/features/registro/vehiculos/interfaces/vehiculos.interface";
import { converStringToNumber } from "@/utils/stringToBoolean";

const useModalVehiculos = () => {
  const {
    loading,
    handleClose,
    createVehiculos,
    updateVehiculos,
    methodsVehiculos,
    currentVehiculos,
    findPlaca,
  } = useContext(VehiculosContext);
  const { marcas } = useContext(MarcasContext);
  const { tiposVehiculos } = useContext(TiposVehiculosContext);
  const { paises } = useContext(PaisContext);

  const onSubmit = (data: VehiculosForm) => {
    data.estado = data.estado === 1 ? true : false;
    const formatData = {
      ...data,
      modelo: converStringToNumber(data.modelo.toString()),
      marca: data.marca.value,
      tipo_vehiculo: data.tipo_vehiculo.value,
      pais: data.pais.value,
    };
    if (currentVehiculos.id) {
      updateVehiculos(currentVehiculos.id, formatData as any);
    } else {
      createVehiculos(formatData as any);
    }
  };

  const findMarca = (id: number) => {
    return marcas.find((marca) => marca.id === id);
  };

  const findPais = (id: number) => {
    return paises.find((pais) => pais.id === id);
  };

  const findTipoVehiculo = (id: number) => {
    return tiposVehiculos.find((tipoVehiculo) => tipoVehiculo.id === id);
  };

  useEffect(() => {
    if (currentVehiculos.id) {
      methodsVehiculos.setValue("placa", currentVehiculos.placa);
      const marca = findMarca(currentVehiculos.id_marca);
      if (marca)
        methodsVehiculos.setValue("marca", {
          value: marca.id,
          label: marca.nombre,
        });
      const pais = findPais(currentVehiculos.id_pais);
      if (pais)
        methodsVehiculos.setValue("pais", {
          value: pais.id,
          label: pais.nombre,
        });
      const tipoVehiculo = findTipoVehiculo(currentVehiculos.id_tipo_vehiculo);
      if (tipoVehiculo)
        methodsVehiculos.setValue("tipo_vehiculo", {
          value: tipoVehiculo.id,
          label: tipoVehiculo.nombre,
        });
      methodsVehiculos.setValue("modelo", currentVehiculos.modelo);
      methodsVehiculos.setValue("numchasis", currentVehiculos.numchasis);
      methodsVehiculos.setValue(
        "numerohabilitacion",
        currentVehiculos.numerohabilitacion
      );
    } else {
      methodsVehiculos.setValue("placa", "");
      methodsVehiculos.setValue("marca", "");
      methodsVehiculos.setValue("pais", "");
      methodsVehiculos.setValue("tipo_vehiculo", "");
      methodsVehiculos.setValue("modelo", "");
      methodsVehiculos.setValue("numchasis", "");
      methodsVehiculos.setValue("numerohabilitacion", "");
    }
  }, [currentVehiculos]);

  return {
    loading,
    open,
    handleClose,
    methodsVehiculos,
    onSubmit,
    currentVehiculos,
    marcas,
    tiposVehiculos,
    paises,
    findPlaca,
  };
};

export default useModalVehiculos;
