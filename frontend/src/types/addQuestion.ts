import { QuestionType } from "./QuestionType";

export type AddQuestion = {
  text: string;
  type: QuestionType;
  options: string[];
  answer: string;
};
