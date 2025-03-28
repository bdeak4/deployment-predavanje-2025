import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';

export class QuizCudResponseDto extends CreateQuizDto {
  @ApiProperty({ example: 'bb3d2fae-ff67-4261-9d90-217d70e4b7d2' })
  id: string;
}
