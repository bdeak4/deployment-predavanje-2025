import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UpdateQuizDto } from './update-quiz.dto';
import { QuestionResponseDto } from 'src/question/dto/question-response.dto';
import { UpdateQuestionDto } from 'src/question/dto/update-question.dto';
import { Type } from 'class-transformer';

export class CreateQuizDto extends UpdateQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  @IsUUID('4', { message: 'Invalid category ID format (UUID expected)' })
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  categoryId: string;

  @IsArray()
  @ArrayMinSize(5)
  @ApiProperty({ example: [UpdateQuestionDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions: UpdateQuestionDto[];
}
