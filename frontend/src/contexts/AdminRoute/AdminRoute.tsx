import { ClipLoader } from "react-spinners";
import { useAuth } from "../AuthContext/useAuth";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { paths } from "@/router/paths";
import { Role } from "@/enums/Role";

export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (!user) {
    toast.error("You must log in to continue");
    return <Navigate to={paths.login} />;
  }

  if (user.role !== Role.Admin) {
    toast.error("You have to log in as admin to access that page");
    return <Navigate to={paths.home} />;
  }

  return <Outlet />;
};
