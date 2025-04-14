import { UserStats } from "@/types/UserStats";
import c from "./adminStatsPage.module.css";
type AdminStatsPageProps = {
  data: UserStats[];
};

export const AdminStatsPage = ({ data }: AdminStatsPageProps) => {
  return (
    <div>
      <h2 className={c.heading}>Leaderboard</h2>
      <ul className={c.list}>
        {data.map((user, index) => (
          <li key={user.id} className={c.card}>
            <div className={c.left}>
              <span className={c.rank}>{index + 1}</span>
              <span className={c.username}>{user.username}</span>
            </div>
            <div className={c.points}>{user.points} pts</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
