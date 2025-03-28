import { QuizResponseDto } from 'src/quiz/dto/response-quiz.dto';

export class CategoryResponseDto {
  id: string;
  name: string;
  quiz: QuizResponseDto[];
}
