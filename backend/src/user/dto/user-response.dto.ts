import { ApiProperty } from '@nestjs/swagger';
import { QuizResultResponseDto } from 'src/quiz-result/dto/QuizResultResponse.dto';

export class UserResponseDto {
  @ApiProperty({ example: 'a3cd2fae-ff67-4261-9d90-217d70e4b7d2' })
  id: string;

  @ApiProperty({ example: 'gadzam' })
  username: string;

  @ApiProperty({ example: 'mate@mate.com' })
  email: string;

  @ApiProperty({ example: 'test1' })
  password: string;

  @ApiProperty({ example: false })
  isAdmin: boolean;

  @ApiProperty({ example: 100 })
  points: number;

  @ApiProperty({ type: [QuizResultResponseDto] })
  quizResults: QuizResultResponseDto[];
}
