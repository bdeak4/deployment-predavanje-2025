import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateQuizResultDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  quizId: string;

  @IsInt()
  @ApiProperty({ example: 100 })
  score: number;
}
