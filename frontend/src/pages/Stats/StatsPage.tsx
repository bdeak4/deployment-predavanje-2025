import { useAuth } from "@/contexts";
import useFetch from "@/hooks/useFetch";
import { getRanking } from "@/services/userService";
import { ClipLoader } from "react-spinners";
import { AdminStatsPage } from "./AdminStats/AdminStatsPage";
import { UserStatsPage } from "./UserStats/UserStatsPage";
import { Role } from "@/enums/Role";
import { UserRanking } from "@/types/UserRanking";
import { UserStats } from "@/types/UserStats";

export const StatsPage = () => {
  const { user } = useAuth();
  const { data, error, isLoading } = useFetch<unknown>(getRanking);

  if (!user) {
    return;
  }

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (error) throw new Error(error || "Unknown error");

  if (!data) {
    return (
      <div className="container">
        <p>No user found</p>
      </div>
    );
  }

  return (
    <div className="headerPadding container">
      {Array.isArray(data) && user.role === Role.Admin ? (
        <AdminStatsPage data={data as UserStats[]} />
      ) : (
        <UserStatsPage data={data as UserRanking} />
      )}
    </div>
  );
};
