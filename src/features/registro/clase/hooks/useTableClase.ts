import { useContext, useState } from "react";
import { ClaseContext } from "@/features/registro/clase/context/ClaseContext";
import { Clase } from "@/features/registro/clase/interface/clase.interface";

const useTableClase = () => {
  const { clase, loading, deleteClase, setCurrentClase } =
    useContext(ClaseContext);

  const [search, setSearch] = useState("");

  const searchClase = () => {
    return clase?.filter((clase) => {
      const marcaClase = clase.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || marcaClase;
    });
  };

  const open = (clase: Clase) => {
    setCurrentClase(clase);
  };

  return {
    loading,
    deleteClase,
    search,
    setSearch,
    searchClase,
    open,
  };
};

export default useTableClase;
