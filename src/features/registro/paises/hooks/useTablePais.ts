import { useContext, useState } from "react";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { Pais } from "@/features/registro/paises/interfaces/pais.interface";

const useTablePais = () => {
  const { paises, deletePais, setCurrentPais, loading } = useContext(PaisContext);
  const [search, setSearch] = useState("");

  const searchPais = () => {
    return paises.filter((pais) => {
      const paisMatches = pais.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || paisMatches;
    });
  };

  const handleCurrent = (pais: Pais) => {
    setCurrentPais(pais);
  };

  return {
    deletePais,
    search,
    setSearch,
    searchPais,
    handleCurrent,
    loading
  };
};

export default useTablePais;
