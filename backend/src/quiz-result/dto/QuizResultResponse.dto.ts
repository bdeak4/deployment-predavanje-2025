import { ApiProperty } from '@nestjs/swagger';

export class QuizResultResponseDto {
  @ApiProperty({ example: 'a3cd2fae-ff67-4261-9d90-217d70e4b7d2' })
  id: string;

  @ApiProperty({ example: 'b01be10f-3d35-42e0-99d0-14d9c0db4ed2' })
  userId: string;

  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  quizId: string;

  @ApiProperty({ example: 10 })
  score: number;
}
