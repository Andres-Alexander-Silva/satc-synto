import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthForm } from "@/features/auth/interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import * as authServices from "@/features/auth/services/auth.services";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValues {
  loading: boolean;
  methodsAuth: any;
  logout: (token: string) => void;
  login: (data: AuthForm) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  loading: false,
  methodsAuth: {},
  logout: () => {},
  login: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const methodsAuth = useForm<AuthForm>();

  const navigate = useNavigate();

  const login = async (datos: AuthForm) => {
    try {
      setLoading(true);
      const { data } = await authServices.login(datos);
      cookies.set("token", data.token);
      cookies.set("user", data.username);
      const token = data.token;
      const decodedToken = jwtDecode(token);
      if (decodedToken && "empresa" in decodedToken) {
        cookies.set("empresa", decodedToken.empresa);
      }
      methodsAuth.reset();
      navigate("/main/inicio");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al iniciar sesión",
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (token: string) => {
    try {
      await authServices.logout(token);
      cookies.remove("token");
      cookies.remove("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ methodsAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
