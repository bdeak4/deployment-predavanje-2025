import { Navigate, Outlet } from "react-router";
import { useAuth } from "../AuthContext/useAuth";
import { paths } from "@/router/paths";
import toast from "react-hot-toast";

export function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    toast.error("You must log in to access quiz");
    return <Navigate to={paths.login} />;
  }

  return <Outlet />;
}
