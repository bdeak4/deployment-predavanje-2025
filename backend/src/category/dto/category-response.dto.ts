import { ApiProperty } from '@nestjs/swagger';
import { QuizResponseDto } from 'src/quiz/dto/response-quiz.dto';

export class CategoryResponseDto {
  @ApiProperty({ example: 'bb3d2fae-ff67-4261-9d90-217d70e4b7d2' })
  id: string;
  @ApiProperty({ example: 'History' })
  name: string;
  @ApiProperty({ type: QuizResponseDto })
  quizzes: QuizResponseDto[];
}
