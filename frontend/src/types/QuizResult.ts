import { Quiz } from "./Quiz";

export type QuizResult = {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  completedAt: Date;
  quiz: Quiz;
};
