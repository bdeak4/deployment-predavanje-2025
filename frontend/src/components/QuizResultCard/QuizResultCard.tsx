import { QuizResult } from "@/types/QuizResult";
import c from "./quizResultCard.module.css";
type QuizResultCardProps = {
  result: QuizResult;
};

export const QuizResultCard = ({ result }: QuizResultCardProps) => {
  const date = new Date(result.completedAt).toLocaleDateString();

  return (
    <div className={c.card}>
      <div className={c.content}>
        <h3 className={c.title}>{result.quiz.name}</h3>
        <p className={c.score}>
          Score: <strong>{result.score}</strong>
        </p>
        <p className={c.date}>Completed on: {date}</p>
      </div>
    </div>
  );
};
