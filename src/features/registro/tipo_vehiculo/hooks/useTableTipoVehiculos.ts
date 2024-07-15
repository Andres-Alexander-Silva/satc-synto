import { useContext, useState } from "react";
import { TiposVehiculosContext } from "@/features/registro/tipo_vehiculo/context/TiposVehiculosContext";
import { TiposVehiculos } from "@/features/registro/tipo_vehiculo/interface/tipos_vehiculos.interface";

const useTableTipoVehiculos = () => {
  const {
    tiposVehiculos,
    loading,
    deleteTiposVehiculos,
    setCurrentTipoVehiculo,
  } = useContext(TiposVehiculosContext);

  const [search, setSearch] = useState("");

  const searchTipoVehiculo = () => {
    return tiposVehiculos.filter((tipoPais) => {
      const nombreMatches = tipoPais.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || nombreMatches;
    });
  };

  const open = (tipoVehiculos: TiposVehiculos) => {
    setCurrentTipoVehiculo(tipoVehiculos);
  };

  return {
    loading,
    deleteTiposVehiculos,
    open,
    search,
    setSearch,
    searchTipoVehiculo,
  };
};

export default useTableTipoVehiculos;
