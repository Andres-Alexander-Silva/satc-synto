import { useContext, useState } from "react";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";
import { ListadoCartaporteContext } from "@/features/carta_porte/listado/context/ListadoCartaporteContext";

const useTableListadoCartaporte = () => {
  const { listadoCartaporte, loading, downloadOriginal } = useContext(
    ListadoCartaporteContext
  );
  const { empresaFind } = useContext(EmpresaContext);

  const [search, setSearch] = useState("");

  const formatCartaporteId = (id: number) => id.toString().padStart(3, "0");

  const cartaporteSorted = listadoCartaporte.sort(
    (a, b) => b.cartaporte.id - a.cartaporte.id
  );

  const searchCartaporte = () => {
    return cartaporteSorted.filter((cp) => {
      const remitenteMatch = cp.cartaporte.remitente.razon_social
        .toLowerCase()
        .includes(search.toLowerCase());

      const destinatarioMatch = cp.cartaporte.destinatario.razon_social
        .toLowerCase()
        .includes(search.toLowerCase());

      const numCartaporteMatch = String(formatCartaporteId(cp.cartaporte.id))
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        remitenteMatch ||
        destinatarioMatch ||
        numCartaporteMatch
      );
    });
  };

  return {
    listadoCartaporte,
    loading,
    searchCartaporte,
    search,
    setSearch,
    downloadOriginal,
    empresaFind,
  };
};

export default useTableListadoCartaporte;
