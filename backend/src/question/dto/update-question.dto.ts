import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { QuestionType } from 'src/enums/QuestionType';

export class UpdateQuestionDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Question?' })
  text: string;

  @IsNotEmpty()
  @IsEnum(QuestionType, {
    message: 'Type must be a valid QuestionType enum value',
  })
  @ApiProperty({ example: QuestionType.MULTIPLE_CHOICE })
  type: QuestionType;

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: ['A', 'B', 'C', 'D'] })
  options: string[];

  @IsNotEmpty()
  @ApiProperty({ example: 'Correct Answer' })
  answer: string;
}
