import { UserRanking } from "@/types/UserRanking";
import c from "./userStatsPage.module.css";
import { QuizResultCard } from "@/components";

type UserStatsPageProps = {
  data: UserRanking;
};

export const UserStatsPage = ({ data }: UserStatsPageProps) => {
  const user = data.user;
  return (
    <div>
      <h2 className={c.title}>Your Stats</h2>
      <div className={c.card}>
        <div className={c.row}>
          <span className={c.label}>Username:</span>
          <span>{user.username}</span>
        </div>
        <div className={c.row}>
          <span className={c.label}>Total Points:</span>
          <span>{user.points}</span>
        </div>
        <div className={c.row}>
          <span className={c.label}>Ranking:</span>
          <span>
            #{data.rank} / {data.totalUsers}
          </span>
        </div>
      </div>

      <h2 className={`${c.title} ${c.history}`}>Quiz History</h2>
      {user.quizResults.length < 1 ? (
        <>No history</>
      ) : (
        <div className={c.quizCard}>
          {user.quizResults.map((result) => (
            <QuizResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};
