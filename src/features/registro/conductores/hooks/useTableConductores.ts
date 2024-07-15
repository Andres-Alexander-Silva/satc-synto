import { useContext, useState } from "react";
import { ConductoresContext } from "@/features/registro/conductores/context/ConductoresContext";
import { Conductores } from "@/features/registro/conductores/interfaces/conductores.interface";

const useTableConductores = () => {
  const { conductores, loading, setCurrentConductores, deleteConductores } =
    useContext(ConductoresContext);

  const [search, setSearch] = useState("");

  const searchConductores = () => {
    const conductoresToDisplay = conductores.slice(1);
    return conductoresToDisplay.filter((conductores) => {
      const documentoMatches = conductores.numero_documento
        .toLowerCase()
        .includes(search.toLowerCase());

      const nombreMatches = conductores.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const apellidoMatches = conductores.apellido
        .toLowerCase()
        .includes(search.toLowerCase());

      const licenciaMatches = conductores.licencia
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        documentoMatches ||
        nombreMatches ||
        apellidoMatches ||
        licenciaMatches
      );
    });
  };

  const open = (conductor: Conductores) => {
    setCurrentConductores(conductor);
  };

  return {
    loading,
    open,
    deleteConductores,
    search,
    setSearch,
    searchConductores,
  };
};

export default useTableConductores;
