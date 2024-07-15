import { createContext, useEffect, useState } from "react";
import { Permission } from "@/features/usuarios/interfaces/usuario.interface";
import * as usuariosServices from "@/features/usuarios/services/usuarios.services";

interface UsuariosProviderProps {
  children: React.ReactNode;
}

interface UsuariosContextValues {
  loading: boolean;
  permissions: Permission[];
  getPermissions: () => void;
}

export const UsuariosContext = createContext<UsuariosContextValues>({
  loading: false,
  permissions: [],
  getPermissions: () => {},
});

export const UsuariosProvider = ({ children }: UsuariosProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const getPermissions = async () => {
    try {
      setLoading(true);
      const { data } = await usuariosServices.getPermissions();
      setPermissions(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <UsuariosContext.Provider value={{ permissions, loading, getPermissions }}>
      {children}
    </UsuariosContext.Provider>
  );
};
