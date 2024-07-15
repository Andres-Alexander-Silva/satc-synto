import { useContext, useState } from "react";
import { IcotermsContext } from "@/features/registro/iconterms/context/IcotermsContext";
import { Icoterms } from "@/features/registro/iconterms/interfaces/icoterms.interface";

const useTableIcoterms = () => {
  const { icoterms, loading, deleteIcoterms, setCurrentIcoterms } =
    useContext(IcotermsContext);

  const [search, setSearch] = useState("");

  const searchIcoterm = () => {
    return icoterms?.filter((icoterm) => {
      const icotermDesc = icoterm.descripcion
        .toLowerCase()
        .includes(search.toLowerCase());

      const icotermCode = icoterm.codigo
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || icotermDesc || icotermCode;
    });
  };

  const open = (icoterm: Icoterms) => {
    setCurrentIcoterms(icoterm);
  };

  return {
    loading,
    deleteIcoterms,
    search,
    setSearch,
    searchIcoterm,
    open,
  };
};

export default useTableIcoterms;
