import { UserStats } from "@/types/UserStats";
import c from "./adminStatsPage.module.css";
import { useState } from "react";
import { QuizResultCard } from "@/components";
type AdminStatsPageProps = {
  data: UserStats[];
};

export const AdminStatsPage = ({ data }: AdminStatsPageProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClick = (userId: string) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div>
      <h2 className={c.heading}>Leaderboard</h2>
      <p className={c.instruction}>
        Click on a user card to view their quiz results and details
      </p>
      <div className={c.list}>
        {data.map((user, index) => (
          <div
            key={user.id}
            className={c.card}
            onClick={() => handleClick(user.id)}
          >
            <div className={c.info}>
              <div className={c.position}>
                <span className={c.rank}>#{index + 1}</span>
                <span className={c.username}>{user.username}</span>
              </div>
              <div className={c.points}>{user.points} pts</div>
            </div>

            <div
              className={`${c.resultsWrapper} ${
                selectedUserId === user.id ? c.open : ""
              }`}
            >
              {selectedUserId === user.id && (
                <div>
                  {user.quizResults.length > 0 ? (
                    user.quizResults.map((result) => (
                      <QuizResultCard key={result.id} result={result} />
                    ))
                  ) : (
                    <p>No quiz results</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
