import { useContext, useState } from "react";
import { VehiculosContext } from "@/features/registro/vehiculos/context/VehiculosContext";
import { Vehiculos } from "@/features/registro/vehiculos/interfaces/vehiculos.interface";

const useTableVehiculos = () => {
  const { vehiculos, loading, deleteVehiculos, setCurrentVehiculos } =
    useContext(VehiculosContext);

  const [search, setSearch] = useState("");

  const newVehiculos = vehiculos.filter((v) => v.id !== 1);

  const searchVehiculo = () => {
    return newVehiculos.filter((vehiculo) => {
      const marcaMatches = vehiculo.marca
        .toLowerCase()
        .includes(search.toLowerCase());

      const numChasisMatches = vehiculo.numchasis
        .toLowerCase()
        .includes(search.toLowerCase());

      const placaMatches = vehiculo.placa
        .toLowerCase()
        .includes(search.toLowerCase());

      const typeMatches = vehiculo.tipo_vehiculo
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        marcaMatches ||
        numChasisMatches ||
        placaMatches ||
        typeMatches
      );
    });
  };

  const open = (vehiculo: Vehiculos) => {
    setCurrentVehiculos(vehiculo);
  };

  return {
    loading,
    deleteVehiculos,
    open,
    search,
    setSearch,
    searchVehiculo,
  };
};

export default useTableVehiculos;
