import { QuizResult } from "./QuizResult";

export type UserStats = {
  id: string;
  username: string;
  points: number;
  quizResults: QuizResult[];
};
