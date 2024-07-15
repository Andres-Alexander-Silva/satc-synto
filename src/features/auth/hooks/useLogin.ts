import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { AuthForm } from "@/features/auth/interfaces/auth.interface";

const useLogin = () => {
  const { methodsAuth, loading, login } = useContext(AuthContext);

  const onSubmit = (data: AuthForm) => {
    login(data);
  };

  return {
    methodsAuth,
    onSubmit,
    loading,
  };
};

export default useLogin;
