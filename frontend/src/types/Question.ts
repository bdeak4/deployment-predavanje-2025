import { QuestionType } from "./QuestionType";

export type Question = {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  options: string[];
  answer: string;
};
