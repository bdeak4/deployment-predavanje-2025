import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateQuizResultDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 100 })
  score: number;
}
