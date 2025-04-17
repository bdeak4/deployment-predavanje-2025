import { Navigate, Outlet } from "react-router";
import { useAuth } from "../AuthContext/useAuth";
import { paths } from "@/router/paths";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export function PrivateRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (!user) {
    toast.error("You must log in to access this page");
    return <Navigate to={paths.login} />;
  }

  return <Outlet />;
}
