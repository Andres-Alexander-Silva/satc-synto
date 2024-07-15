import { useContext, useState } from "react";
import { PuntoSalidaContext } from "@/features/registro/punto_salida/context/PuntosSalidaContext";
import { PuntoSalida } from "@/features/registro/punto_salida/interfaces/puntos_salida.interface";

const useTablePuntoSalida = () => {
  const { puntosSalida, loading, deletePuntosSalida, setCurrentPuntoSalida } =
    useContext(PuntoSalidaContext);

  const [search, setSearch] = useState("");

  const searchPuntoSalida = () => {
    return puntosSalida.filter((ps) => {
      const puntoSalidaMatches = ps.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || puntoSalidaMatches;
    });
  };

  const open = (ps: PuntoSalida) => {
    setCurrentPuntoSalida(ps);
  };

  return {
    loading,
    deletePuntosSalida,
    open,
    search,
    setSearch,
    searchPuntoSalida,
  };
};

export default useTablePuntoSalida;
