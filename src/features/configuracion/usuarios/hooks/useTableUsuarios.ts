import { useContext, useState } from "react";
import { UsuariosContext } from "@/features/configuracion/usuarios/context/UsuariosContext";
import { Usuarios } from "@/features/configuracion/usuarios/interfaces/usuarios.interface";

const useTableUsuariops = () => {
  const { usuarios, loading, deleteUsuarios, setCurrentUsuarios } =
    useContext(UsuariosContext);

  const [search, setSearch] = useState("");

  const searchUsuario = () => {
    return usuarios.filter((usuario) => {
      const nombreMatches = usuario.datospersonales.nombres
        .toLowerCase()
        .includes(search.toLowerCase());

      const apellidoMatches = usuario.datospersonales.apellidos
        .toLowerCase()
        .includes(search.toLowerCase());

      const documentoMatches = usuario.datospersonales.noDocumento
        .toLowerCase()
        .includes(search.toLowerCase());

      const direccionMatches = usuario.datospersonales.direccion
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        nombreMatches ||
        apellidoMatches ||
        documentoMatches ||
        direccionMatches
      );
    });
  };

  const open = (usuario: Usuarios) => {
    setCurrentUsuarios(usuario);
  };

  return {
    loading,
    deleteUsuarios,
    open,
    search,
    setSearch,
    searchUsuario,
  };
};

export default useTableUsuariops;
