import { useContext, useState } from "react";
import { ListadoCartaporteContext } from "@/features/carta_porte/listado/context/ListadoCartaporteContext";

const useModalListadoCartapotes = () => {
  const { listadoCartaporte } = useContext(ListadoCartaporteContext);

  const [search, setSearch] = useState("");

  const formatCartaporteId = (id: number) => id.toString().padStart(3, "0");

  return {
    listadoCartaporte,
    formatCartaporteId,
    search,
    setSearch,
  };
};

export default useModalListadoCartapotes;
