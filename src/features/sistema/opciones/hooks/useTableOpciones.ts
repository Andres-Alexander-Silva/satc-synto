import { useContext, useState } from "react";
import { OpcionesContext } from "@/features/sistema/opciones/context/OpcionesContext";
import { Opciones } from "@/features/sistema/opciones/interface/opciones.interfaces";

const useTableOpciones = () => {
  const { opciones, loading, deleteOpciones, setCurrentOpciones } =
    useContext(OpcionesContext);

  const [search, setSearch] = useState("");

  const searchOpcion = () => {
    return opciones.filter((opcion) => {
      const nombreMatches = opcion.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const urlMatches = opcion.url
        .toLowerCase()
        .includes(search.toLowerCase());

      const menuMatches = opcion.menu.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || nombreMatches || urlMatches || menuMatches;
    });
  };

  const open = (opcion: Opciones) => {
    setCurrentOpciones(opcion);
  };

  return {
    loading,
    deleteOpciones,
    open,
    search,
    setSearch,
    searchOpcion,
  };
};

export default useTableOpciones;
