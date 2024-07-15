import { useContext, useState } from "react";
import { EmpresaContext } from "@/features/configuracion/empresas//context/EmpresaContext";
import { Empresa } from "@/features/configuracion/empresas/interfaces/empresas.interface";

const useTableEmpresa = () => {
  const { empresas, loading, deleteEmpresas, setCurrentEmpresa } =
    useContext(EmpresaContext);

  const [search, setSearch] = useState("");

  const searchEmpresa = () => {
    return empresas.filter((empresa) => {
      const identificacionMatches = empresa.identificacion
        .toLowerCase()
        .includes(search.toLowerCase());

      const razonSocialMatches = empresa.razon_social
        .toLowerCase()
        .includes(search.toLowerCase());

      const correoMatches = empresa.correo_electronico
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        identificacionMatches ||
        razonSocialMatches ||
        correoMatches
      );
    });
  };

  const open = (empresa: Empresa) => {
    setCurrentEmpresa(empresa);
  };

  return {
    loading,
    deleteEmpresas,
    open,
    search,
    setSearch,
    searchEmpresa,
  };
};

export default useTableEmpresa;
