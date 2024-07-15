import { useContext, useState } from "react";
import { MarcasContext } from "@/features/registro/marca/context/MarcasContext";
import { Marcas } from "@/features/registro/marca/interface/marcas.interfaces";

const useTableMarcas = () => {
  const { marcas, loading, deleteMarcas, setCurrentMarcas } =
    useContext(MarcasContext);

  const [search, setSearch] = useState("");

  const newMarcas = marcas.filter((m) => m.id !== 1);

  const searchMarca = () => {
    return newMarcas.filter((marca) => {
      const nombreMatches = marca.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || nombreMatches;
    });
  };

  const open = (marca: Marcas) => {
    setCurrentMarcas(marca);
  };

  return {
    loading,
    deleteMarcas,
    open,
    search,
    setSearch,
    searchMarca,
  };
};

export default useTableMarcas;
