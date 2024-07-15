import { useContext, useState } from "react";
import { DepartamentosContext } from "@/features/registro/departamentos/context/DepartamentosContext";
import { Departamentos } from "@/features/registro/departamentos/interfaces/departamentos.interfaces";

const useTableDepartamentos = () => {
  const {
    departamentos,
    loading,
    deleteDepartamento,
    setCurrentDepartamentos,
  } = useContext(DepartamentosContext);

  const [search, setSearch] = useState("");

  const searchDepartamento = () => {
    return departamentos.filter((departamento) => {
      const codigoMatches = departamento.codigo
        .toLowerCase()
        .includes(search.toLowerCase());

      const nombreMatches = departamento.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const paisMatches = departamento.pais
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || codigoMatches || nombreMatches || paisMatches;
    });
  };

  const open = (departamento: Departamentos) => {
    setCurrentDepartamentos(departamento);
  };

  return {
    loading,
    deleteDepartamento,
    open,
    search,
    setSearch,
    searchDepartamento,
  };
};

export default useTableDepartamentos;
