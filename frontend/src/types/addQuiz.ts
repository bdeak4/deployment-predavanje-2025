import { AddQuestion } from "./addQuestion";

export type CreateQuiz = {
  name: string;
  categoryId: string;
  questions: AddQuestion[];
};
