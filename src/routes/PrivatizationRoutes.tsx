import { Navigate } from "react-router-dom";
import { LOG_PUBLIC, LOG_PRIVATE } from "@/routes/paths";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface RoutesProps {
  children: React.ReactNode;
}

export const Private = ({ children }: RoutesProps) => {
  if (!cookies.get("token")) {
    return <Navigate to={LOG_PRIVATE} />;
  }
  return <>{children}</>;
};

export const Public = ({ children }: RoutesProps) => {
  if (cookies.get("token")) {
    return <Navigate to={LOG_PUBLIC} />;
  }
  return <>{children}</>;
};
