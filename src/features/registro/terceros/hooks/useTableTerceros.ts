import { useContext, useState } from "react";
import { TercerosContext } from "@/features/registro/terceros/context/TercerosContext";
import { Terceros } from "@/features/registro/terceros/interface/terceros.interface";

const useTableTerceros = () => {
  const { terceros, loading, deleteTerceros, setCurrentTerceros } =
    useContext(TercerosContext);

  const [search, setSearch] = useState("");

  const searchTercero = () => {
    return terceros.filter((tercero) => {
      const razonSocialMatches = tercero.razon_social
        .toLowerCase()
        .includes(search.toLowerCase());

      const numeroIdentificacionMatches = tercero.numero_identificacion
        .toLowerCase()
        .includes(search.toLowerCase());

      const telefonoMatches = tercero.telefono
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        razonSocialMatches ||
        numeroIdentificacionMatches ||
        telefonoMatches
      );
    });
  };

  const open = (tercero: Terceros) => {
    setCurrentTerceros(tercero);
  };

  return {
    loading,
    deleteTerceros,
    open,
    search,
    setSearch,
    searchTercero,
  };
};

export default useTableTerceros;
