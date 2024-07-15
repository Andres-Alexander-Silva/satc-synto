import { useContext, useState } from "react";
import { MunicipiosContext } from "@/features/registro/municipios/context/MunicipiosContext";
import { Municipios } from "@/features/registro/municipios/interface/municipios.interface";

const useTableMunicipios = () => {
  const {
    municipios,
    loading,
    deleteMunicipios,
    setCurrentMunicipios,
  } = useContext(MunicipiosContext);

  const [search, setSearch] = useState("");

  const searchMunicipios = () => {
    return municipios.filter((municipio) => {
      const codigoMatches = municipio.codigo
        .toLowerCase()
        .includes(search.toLowerCase());

      const nombreMatches = municipio.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const paisMatches = municipio.pais
        .toLowerCase()
        .includes(search.toLowerCase());

      const deptoMatches = municipio.departamento
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || codigoMatches || nombreMatches || paisMatches || deptoMatches;
    });
  };

  const open = (municipio: Municipios) => {
    setCurrentMunicipios(municipio);
  };

  return {
    loading,
    deleteMunicipios,
    open,
    search,
    setSearch,
    searchMunicipios,
  };
};

export default useTableMunicipios;
