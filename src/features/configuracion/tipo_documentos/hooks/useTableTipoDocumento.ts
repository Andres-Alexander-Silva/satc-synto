import { useContext, useState } from "react";
import { TipoDocumentoContext } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";
import { TipoDocumento } from "@/features/configuracion/tipo_documentos/interfaces/tipo_documento.interface";

const useTableTipoDocumento = () => {
  const {
    tipoDocumento,
    loading,
    deleteTipoDocumento,
    setCurrentTipoDocumento,
  } = useContext(TipoDocumentoContext);

  const [search, setSearch] = useState("");

  const searchTipoDoc = () => {
    return tipoDocumento.filter((tipoDoc) => {
      const siglaMatches = tipoDoc.sigla
        .toLowerCase()
        .includes(search.toLowerCase());

      const descMatches = tipoDoc.descripcion
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || siglaMatches || descMatches;
    });
  };

  const open = (tipoDocumento: TipoDocumento) => {
    setCurrentTipoDocumento(tipoDocumento);
  };

  return {
    loading,
    deleteTipoDocumento,
    open,
    search,
    setSearch,
    searchTipoDoc,
  };
};

export default useTableTipoDocumento;
