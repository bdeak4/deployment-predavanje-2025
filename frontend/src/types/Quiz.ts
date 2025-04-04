import { Question } from "./Question";
import { QuizResult } from "./QuizResult";
import { Category } from "./Category";

export type Quiz = {
  id: string;
  name: string;
  imgUrl: string;
  categoryId: string;
  questions: Question[];
  quizResults: QuizResult[];
  category: Category;
};
