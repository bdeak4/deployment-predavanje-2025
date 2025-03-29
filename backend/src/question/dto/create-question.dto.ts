import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateQuestionDto } from './update-question.dto';

export class CreateQuestionDto extends UpdateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: '73009c11-4c18-4f1c-b1a2-acf013543477' })
  quizId: string;
}
