import { UserStats } from "@/types/UserStats";
import c from "./adminStatsPage.module.css";
type AdminStatsPageProps = {
  data: UserStats[];
};

export const AdminStatsPage = ({ data }: AdminStatsPageProps) => {
  return (
    <div className="headerPadding container">
      <h2>Leaderboard</h2>
      <ul>
        {data.map((user, index) => (
          <li key={user.id}>
            <span>
              {index + 1} {user.username}
            </span>
            <span>{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
